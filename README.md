![Switcher Logo](images/Switcher_logo_200.png)

# switcher-boiler-dial-card

Custom Switcher Boiler cards for Home Assistant — includes the original tile-style card plus a new **draggable circular timer dial** designed for quick, one-handed timer control on mobile.

Built to work with the official [Switcher Integration](https://www.home-assistant.io/integrations/switcher_kis/) for Home Assistant.

---

## Cards

### Circular Timer Dial *(new)*

Set a timer by dragging the knob around the arc — just like the Switcher app. Drag past the full circle to set times beyond 60 minutes. The device turns on automatically when you release.

![Dial card preview](images/dial-card-preview.svg)

**Features:**
- Drag the knob clockwise to set a timer (one full rotation = 60 min)
- Multi-rotation support — drag 1.5× to set 90 min, etc.
- Configurable maximum timer limit
- Device turns on with the set timer the moment you release the knob
- Resets to 0 if the device is manually turned off
- Displays remaining time and optional power consumption sensor
- Fully responsive — scales to any card size, works great on mobile
- 44 px touch targets for comfortable finger dragging

---

### Tile Card *(original)*

The classic tile-style card with preset timer buttons.

![Tile card preview](images/tile-card-preview.svg)

**Features:**
- Preset timer values (configurable)
- Optional temperature / sensor display with color thresholds
- Optional icon sensor for water temperature
- Fully configurable from the HA UI editor

---

## Installation

### HACS (Custom Repository)

1. Open HACS in Home Assistant
2. Go to **Frontend** → click the three-dot menu → **Custom repositories**
3. Add `https://github.com/Puuuchkie/switcher-boiler-dial-card` as a **Dashboard** (Lovelace) repository
4. Search for "Switcher Boiler Dial Card" and install it
5. Reload your browser

### Manual

1. Download `switcher-boiler-card.js` from the [`dist/`](dist/) folder
2. Copy it to `config/www/switcher-boiler-card/switcher-boiler-card.js`
3. Add it as a resource in your dashboard:
   - **UI:** _Settings_ → _Dashboards_ → _⋮_ → _Resources_ → _Add Resource_
     - URL: `/local/switcher-boiler-card/switcher-boiler-card.js`
     - Type: `JavaScript Module`
   - **YAML:**
     ```yaml
     resources:
       - url: /local/switcher-boiler-card/switcher-boiler-card.js
         type: module
     ```

---

## Usage

Both cards are fully configurable from the HA UI editor. You can also use YAML.

### Circular Timer Dial

```yaml
type: custom:switcher-boiler-card-circular
entity: switch.switcher_touch_d54f
name: Boiler
time_left: sensor.switcher_touch_d54f_remaining_time
power_sensor: sensor.switcher_touch_d54f_power
timer_limit: 90
```

| Name | Description | Required | Default |
|---|---|---|---|
| `type` | `custom:switcher-boiler-card-circular` | yes | |
| `entity` | Switcher switch entity | yes | |
| `name` | Card name. Leave empty to use entity friendly name. | no | entity name |
| `icon` | Card icon. | no | |
| `time_left` | Remaining time sensor entity. Displayed when device is on. | no | |
| `power_sensor` | Power consumption sensor entity. Displayed when device is on. | no | |
| `timer_limit` | Maximum timer in minutes. Limits how far the knob can be dragged. | no | `150` |

### Tile Card (original)

```yaml
type: custom:switcher-boiler-card
entity: switch.switcher_touch_d54f
name: Boiler
icon: mdi:waves
time_left: sensor.switcher_touch_d54f_remaining_time
sensor_1: sensor.switcher_touch_d54f_current
icon_sensor: sensor.switcher_water_temperature
color_thresholds: true
cold_threshold: 20
hot_threshold: 50
temp_resolution: 1
timer_values:
  - "15"
  - "30"
  - "45"
  - "60"
```

| Name | Description | Required | Default |
|---|---|---|---|
| `type` | `custom:switcher-boiler-card` | yes | |
| `entity` | Switcher switch entity | yes | |
| `name` | Card name. Leave empty to use entity friendly name. | no | `"Boiler"` |
| `icon` | Card icon. Leave empty to use entity icon. | no | `"mdi:waves"` |
| `time_left` | Time left sensor entity. | no | |
| `sensor_1` | Sensor displayed when Switcher is On. | no | |
| `sensor_2` | Sensor displayed when Switcher is On or Off. | no | |
| `icon_sensor` | Numeric sensor displayed as icon (e.g. water temperature). | no | |
| `color_thresholds` | Enable temperature color thresholds for icon sensor. | no | `false` |
| `cold_threshold` | Cold threshold upper limit. | no | `20` |
| `hot_threshold` | Hot threshold lower limit. | no | `50` |
| `temp_resolution` | Decimal digits for temperature (0, 1, or 2). | no | `1` |
| `timer_values` | List of timer preset values in minutes. | no | `15, 30, 45, 60` |

---

## Remaining Time Sensor (optional template)

Use this HA template sensor to display remaining time in a friendlier format.
Replace entity names with your own.

```yaml
template:
  sensor:
    - name: "switcher_kis_remaining_time_alt"
      unique_id: switcher_kis_remaining_time_alt
      icon: mdi:timelapse
      state: >-
        {% if is_state("switch.switcher_touch_d54f", "off") or is_state("sensor.switcher_touch_d54f_remaining_time", "00:00:00") %}
            off
        {% else %}
            {% set hour = states("sensor.switcher_touch_d54f_remaining_time").split(':')[0] %}
            {% set min  = states("sensor.switcher_touch_d54f_remaining_time").split(':')[1] %}
            {% set sec  = states("sensor.switcher_touch_d54f_remaining_time").split(':')[2] %}
            {% set sec_int  = sec|int %}
            {% set min_int  = min|int %}
            {% set hour_int = hour|int %}
            {% if min_int > 0 %}{% set min_int = min_int + 1 %}{% endif %}
            {% if min_int == 60 %}{% set min_int = 0 %}{% set hour_int = hour_int + 1 %}{% endif %}
            {% if hour_int == 0 and min_int == 0 %}
                {{ sec_int }} sec
            {% elif hour_int == 0 %}
                {{ min_int }} min
            {% else %}
                {{'%02d' % hour_int}}:{{'%02d' % min_int}}
            {% endif %}
        {% endif %}
```

---

## Development

```sh
npm install
npm run build      # produces dist/switcher-boiler-card.js
npm run watch      # watch mode on port 4000
npm run start:hass # run Home Assistant in Docker at http://localhost:8123
```

---

## Credits

The tile-style card was originally created by [Dmitry Trosman (dmatik)](https://github.com/dmatik/switcher-boiler-card). This fork extends it with the circular timer dial variant.
