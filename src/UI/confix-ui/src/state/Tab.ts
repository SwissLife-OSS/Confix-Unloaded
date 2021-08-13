import { Application } from "./Application";
import { Component } from "./Component";

export interface StoredTab extends Tab {
  color: string;
  type: string;
  active: boolean;
}
export interface Tab {
  id: string;
  title: string;
}

export interface AppPartTab extends Tab {
  type: "APP_PART";
  item: {
    application: Application;
    part: Application["parts"][0];
  };
}

export interface AppAddTab extends Tab {
  type: "APP_ADD";
}

export interface AppComponentConfigTab extends Tab {
  type: "APP_COMPONENT_CONFIG";
  item: {
    component: Application["parts"][0]["components"][0];
    part: Application["parts"][0];
  };
}

export interface ComponentTab extends Tab {
  type: "COMPONENT";
  item: {
    component: Component;
  };
}

export interface NewComponentTab extends Tab {
  type: "NEW_COMPONENT";
}
