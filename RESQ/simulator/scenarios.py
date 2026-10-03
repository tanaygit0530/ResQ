"""
RESQ Simulator — Disaster Scenarios & Incident Presets
"""

# TODO: Define presets:
#       - Flood Surge (Monsoon Flash Flood in M-East Ward with arterial bridge collapse)
#       - Casualty Surge (Structural breach in Harbor Link industrial corridor)
#       - Earthquake (Multi-epicenter seismic event with widespread road fractures)
#       - Urban Fire (High-density commercial sector blaze requiring mass burns triage)


SCENARIO_PRESETS = {
    "flood_surge": {
        "title": "Flood Surge",
        "description": "Monsoon Flash Flood in M-East Ward with arterial bridge collapse & rapid casualty accumulation along coastal routes.",
        "severity": "High Severity",
        "initial_patients": 50,
        "fleet_active": 25,
        "hospitals_online": 5,
        "blood_reserves": 300,
    },
    "casualty_surge": {
        "title": "Casualty Surge",
        "description": "Harbor Link structural breach resulting in rapid polytrauma influx.",
        "severity": "Critical",
        "initial_patients": 75,
        "fleet_active": 22,
        "hospitals_online": 5,
        "blood_reserves": 240,
    },
    "earthquake": {
        "title": "Earthquake",
        "description": "6.2 magnitude seismic event causing widespread arterial disruption.",
        "severity": "Extreme",
        "initial_patients": 90,
        "fleet_active": 20,
        "hospitals_online": 4,
        "blood_reserves": 180,
    },
    "urban_fire": {
        "title": "Urban Fire",
        "description": "Industrial zone chemical fire requiring specialized burns and respiratory capacity.",
        "severity": "Severe",
        "initial_patients": 40,
        "fleet_active": 26,
        "hospitals_online": 5,
        "blood_reserves": 350,
    },
}
