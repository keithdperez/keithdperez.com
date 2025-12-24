---
categories: ["[[Guides]]"]
type: ["[[Guide]]"]
publish: false
---

# Ron's Wi-Fi check — onsite steps

## 1. Measure the real signal
- stand at the front door  
- use WiFiman or iPhone Wi-Fi info  
- check **RSSI**
  - **-60 or better** → fine  
  - **-67 to -72** → borderline  
  - **-73 or worse** → actual weak spot

## 2. Check which ap the phone is on
- if it’s clinging to basement or far AP → roaming issue, not coverage  
- confirm the closest AP is actually being used

## 3. Tune roaming
- in unifi:
  - enable **Minimum RSSI**  
    - start around **-70 to -72 dBm**
  - enable **Optimize for High-Performance Devices**
- this forces iPhones to hop to the correct AP sooner

## 4. Evaluate the in-wall placement
- remember: all current APs are behind TVs  
- that causes absorption + weird signal shadows  
- expect a couple thin spots by design

## 5. Decide if you need one more ap
only add a new AP if:
- RSSI at the problem spot is consistently **worse than -73**, AND  
- roaming tweaks don’t fix it  

### If adding one:
- **prefer a ceiling-mount U6+** near the front hallway  
- if no cable: use a **Flex Mini** on an existing TV drop and place AP visibly in the room

## 6. What to tell ron
> “You’ve got full speeds. The issue is a couple of small pockets where the signal dips because the APs are behind TVs. I’m going to tune it and check signal quality. If one area still needs help, we’ll add one more AP in a better spot so it’s solid everywhere.”