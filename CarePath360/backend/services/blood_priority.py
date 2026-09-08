import math
from typing import List, Dict, Any, Tuple

# Standard ABO / Rh Compatibility Chart for Red Blood Cells
# Used strictly for preliminary candidate coordination; actual transfusion requires blood bank crossmatch.
DONOR_COMPATIBILITY: Dict[str, List[str]] = {
    "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "A-": ["A-", "A+", "AB-", "AB+"],
    "A+": ["A+", "AB+"],
    "B-": ["B-", "B+", "AB-", "AB+"],
    "B+": ["B+", "AB+"],
    "AB-": ["AB-", "AB+"],
    "AB+": ["AB+"]
}

def is_blood_compatible(donor_group: str, recipient_group: str) -> bool:
    """Checks if donor blood group can provide red blood cells to recipient group."""
    compatible_recipients = DONOR_COMPATIBILITY.get(donor_group, [])
    return recipient_group in compatible_recipients

def calculate_haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculates great-circle distance between two GPS coordinates in kilometers."""
    R = 6371.0  # Earth's radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)

def calculate_eta_minutes(distance_km: float) -> int:
    """Estimates travel arrival time in urban medical corridor."""
    # Assuming average 22 km/h city speed + 3 min mobilization delay
    drive_time = (distance_km / 22.0) * 60.0
    return max(4, int(round(drive_time + 3)))

def calculate_operational_priority(
    donor: Dict[str, Any],
    hospital_lat: float,
    hospital_lng: float,
    recipient_group: str
) -> Tuple[int, str]:
    """
    Computes an AI-assisted operational priority score (0-100).
    Factors:
    - Distance proximity (45%)
    - Travel ETA (25%)
    - Historical response reliability (20%)
    - Exact match bonus (10%)
    """
    dist = calculate_haversine_distance(hospital_lat, hospital_lng, donor["latitude"], donor["longitude"])
    eta = calculate_eta_minutes(dist)
    
    # Distance proximity score (up to 45 pts)
    dist_score = max(0.0, 45.0 - (dist * 7.5))
    
    # ETA score (up to 25 pts)
    eta_score = max(0.0, 25.0 - (eta * 0.7))
    
    # Response rate score (up to 20 pts)
    response_score = (donor.get("response_rate", 85) / 100.0) * 20.0
    
    # Exact match bonus (up to 10 pts)
    match_bonus = 10.0 if donor["blood_group"] == recipient_group else 5.0
    
    total_score = min(99, int(round(dist_score + eta_score + response_score + match_bonus)))
    
    rationale = (
        f"Prioritized with score {total_score}: Located {dist} km away, estimated ETA {eta} min, "
        f"{donor['blood_group']} compatibility, and {donor.get('response_rate', 85)}% historical response rate."
    )
    
    return total_score, rationale

def filter_and_rank_donors(
    donors: List[Dict[str, Any]],
    hospital_lat: float,
    hospital_lng: float,
    target_blood_group: str,
    radius_km: float
) -> List[Dict[str, Any]]:
    """
    Filters registered, opted-in donors within the current progressive radius (1km, 3km, 5km)
    and ranks them using the operational priority engine.
    """
    ranked_candidates = []
    
    for donor in donors:
        # Check operational availability and emergency opt-in
        if not donor.get("available", True) or not donor.get("emergency_opt_in", True):
            continue
            
        # Clinical preliminary compatibility check
        if not is_blood_compatible(donor["blood_group"], target_blood_group):
            continue
            
        dist = calculate_haversine_distance(hospital_lat, hospital_lng, donor["latitude"], donor["longitude"])
        
        # Check radius constraint
        if dist <= radius_km:
            score, rationale = calculate_operational_priority(donor, hospital_lat, hospital_lng, target_blood_group)
            eta = calculate_eta_minutes(dist)
            
            donor_copy = dict(donor)
            donor_copy["distance_km"] = dist
            donor_copy["eta_minutes"] = eta
            donor_copy["priority_score"] = score
            donor_copy["match_rationale"] = rationale
            ranked_candidates.append(donor_copy)
            
    # Sort descending by priority score
    ranked_candidates.sort(key=lambda d: d["priority_score"], reverse=True)
    return ranked_candidates
