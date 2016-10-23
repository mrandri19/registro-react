import * as React from "react";
import { Card, CardTitle } from "react-mdl";
import { withRouter } from "react-router";

import { upcase_first } from "../utils/upcase_first";

function to_svg_degrees(degrees: number): number {
    return (degrees * -0.7) + 252;
}

interface Props {
    name: string;
    mean: number;
    router?: any;
}

class Component extends React.Component<Props, {}> {
    render() {
        let mark_degrees = (this.props.mean / 10) * 360;
        let color = (this.props.mean >= 6) ? "green" : "red";
        return (
            <Card shadow={2} className="subject" onClick={this.handleClick.bind(this)}>
                <CardTitle>
                    <span>{upcase_first(this.props.name)}</span>
                    <svg preserveAspectRatio="xMinYMin" width="64" height="64" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="transparent" />
                        <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="20" stroke="transparent" />
                        <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="20" stroke={color} strokeDasharray="251.2" strokeDashoffset={to_svg_degrees(mark_degrees)} />
                        <text x="32" y="56" fill="black" fontSize="20">{this.props.mean.toFixed(2)}</text>
                    </svg>
                </CardTitle>
            </Card>
        );
    }

    handleClick() {
        let mark = this.props.name.replace(/\s+/g, "");
        this.props.router.push(`/marks/${mark}`);
    }
}

export const SubjectCard = withRouter(Component);
