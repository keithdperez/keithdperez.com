---
publish: false
---

# Livestream Quick Guide (ProPresenter)

### Step 1: Check the Preview Area
<img src="https://mirri.link/U5FeiLT" width="200">

In **ProPresenter**:
- Do you see a **live camera feed** in the top-right preview window?
- On the **right side of the preview**, are the audio meters **showing signal on Channels 3 + 4**?

If **yes** to both, the livestream is working correctly.  
If **no**, move to the steps below.

---

### Step 2: Troubleshooting

#### No Video?
- Go to `Settings > Inputs`
<img src="https://mirri.link/0snMYe2" width=300>
- On **Input 1**, labeled `ATEM Switcher`:
  - Confirm **Device** is set to `Blackmagic Design`

#### No Audio?
-  In `Settings > Inputs > ATEM Switcher`, check:
  - **Audio Source** is `Blackmagic Design`
  Click **Routing**
  - Confirm **ProPresenter Channels 3 + 4** are selected  
    _(not Channels 1 + 2)_

<img src="https://mirri.link/DSYXp0D" width=300>


---

### Audio Level Tip

On the **X32**, each channel is feeding the stream evenly via Bus 11/12.  
Make sure each channel’s **gain is set in the green-to-yellow range**.  
That keeps things clear and balanced for both the room and the livestream.

---

### Known Issue: Audio Buzz

There’s currently a mild buzz due to power interference in the building.  
A **2-channel USB audio interface** will replace the current cable soon.

Once it arrives:
- Plug it into the **Mac mini** (USB-C to USB-B, or use an adapter)

Then in ProPresenter:
- Go to `Settings > Inputs`
- Change **Audio Source** to the new interface name
- Ensure **Routing** is still set to **Channels 3 + 4**

---

That’s it.  
If you see video, and audio on Channels 3 + 4, everything is good to go.