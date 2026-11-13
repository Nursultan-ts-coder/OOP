# Owner Operator Portal

An app for owner/operators of a restaurant portfolio: every restaurant at a glance, its network
status, and what needs attention, inside Grafana.

![Portfolio](https://raw.githubusercontent.com/mcd-gnpo-org/OOP/main/src/img/screenshots/portfolio.png)

## Features

- **Portfolio**: counts of healthy, degraded, down and unknown restaurants, with each restaurant's
  internet, device and routing status as cards, a table or a map.
- **Search** by restaurant or location, keeping the chosen view.
- **Priority attention**: the restaurants with open issues, newest first.
- **Restaurant pages**: a restaurant's network layout with live status, and its insights.
- Follows Grafana's light and dark theme.

## Requirements

- Grafana 13.2.0 or later.
- For the map view: a Google Maps JavaScript API key, restricted to your Grafana's URL.

## Getting started

1. Install the app from the plugin catalog and enable it under **Administration → Plugins and
   data → Plugins → Owner Operator Portal**.
2. On the app's **Configuration** tab, enter the Google Maps API key under **Map settings** and save.
3. Open the app from **More apps → Owner Operator Portal**.

## Support

Report problems at https://github.com/mcd-gnpo-org/OOP/issues.

Developer notes: [DEVELOPMENT.md](https://github.com/mcd-gnpo-org/OOP/blob/main/DEVELOPMENT.md).
