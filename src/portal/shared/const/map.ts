import type { GeoJsonProperties } from 'geojson';
import type { ClusterProperties } from 'supercluster';
import type Supercluster from 'supercluster';

import { baseUrl } from './common';

export const countryCodeKey = 'ISO3166-1-Alpha-2';
export const geoJsonPath = `${baseUrl}map/countries.topo.json`;
export const defaultMaxZoom = 20;

// Property key used across site/country/dashboards map features to uniquely
// identify a restaurant location within GeoJSON feature properties.
export const locationUniqueKey = 'network_name';

export const DEFAULT_SUPERCLUSTER_OPTIONS: Supercluster.Options<
  GeoJsonProperties,
  ClusterProperties
> = {
  radius: 100,
  maxZoom: 20,
  minZoom: 0,
};

// deck.gl cluster/marker layer sizing shared by the dashboards map layers.
export const LOCATION_ICON_SIZE = 40;
export const SELECTED_LOCATION_ICON_SIZE = 48;
export const CLUSTER_TEXT_SIZE = 12;
// Core + aura radii match the cluster SVG circles (70 and 130 out of 240 viewBox, scaled to ~45px)
export const CLUSTER_CORE_RADIUS = 13;
export const CLUSTER_AURA_RADIUS = 24;
// Alpha for cluster fill (~62% opacity, matches original SVG fill alpha 9e/ff)
export const CLUSTER_FILL_ALPHA = 158;
export const CLUSTER_AURA_ALPHA = 40;

export const LOADING_LOCATIONS_MESSAGE = 'Loading locations ...';
