import * as React from "react";
import { withRouter } from "react-router";

import * as types from "../types";

export function BasicRoute(Base: React.ComponentClass<types.OnLogoutRedirectComponent>): any {
    class Component extends Base {
        componentWillUpdate() {
            if (this.props.logged) {
                this.props.router.push("/login");
            }
        }
    }
    return withRouter(Component);
}
