import * as React from "react";
import { AppState } from "../types";
import { connect } from "react-redux";
import { upcase_first } from "../utils/upcase_first";
import * as types from "../types";
import { BasicRoute } from "./BasicRouteHOC";

interface Props extends types.OnLogoutRedirectComponent {
    username: string | null;
};

class Component extends React.Component<Props, {}> {
    render() {
        return (<div className="appPadding">
            <h3>{`Benvenuto ${this.props.username ? this.props.username.toLocaleLowerCase().split(" ").map(upcase_first).join(" ") : "null"}`}</h3>

            <h4>Per attivare le notifiche:</h4>

            <p>
                E' necessario avere <a href={
                    (window.navigator.userAgent.indexOf("Android") < -1) ?
                        "https://itunes.apple.com/app/telegram-messenger/id686449807" :
                        "https://play.google.com/store/apps/details?id=org.telegram.messenger"}>
                    Telegram Messenger
            </a>
                . E' disponibile sia per iPhone che per Android
        </p>
            <p>
                Dopo aver scaricato Telegram bisogna attivare il bot, per attivarlo
            <a href="https://telegram.me/registro_elettronico_bot"> clicca qui</a>.
            Dopo aver aperto il link schiacciare sul pulsante <b>Start</b> e le notifiche verranno attivate
        </p>


            <p>Segnalaci i bug all'indirizzo: <a href="mailto:bugreport@registro.ml">bugreport@registro.ml</a></p>
        </div>);
    }
}

function mapDispatchToProps(dispatch: any) {
    // Every time the state is updated the props are recalculated
    return {};
}

function mapStateToProps(state: AppState): {} {
    // Every time the state is updated the props are recalculated
    return {
        username: state.username,
        logged: state.logged
    };
};

export const Hello = connect(mapStateToProps, mapDispatchToProps)(BasicRoute(Component));
