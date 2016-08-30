import * as React from "react";
import { Card, CardTitle } from "react-mdl";
import {upcase_first} from "../utils/upcase_first";

function to_svg_degrees(degrees: number): number {
    return (degrees * -0.7) + 252;
}

interface Props {
    name: string;
    mean: number;
}

export function SubjectCard(props: Props) {
    let mark_degrees = (props.mean / 10) * 360;
    let color = (props.mean >= 6) ? "green" : "red";
    return (
        <Card shadow={2} className="subject">
            <CardTitle>
                <span>{upcase_first(props.name)}</span>
                <svg preserveAspectRatio="xMinYMin" width="64" height="64" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent"/>
                    <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="20" stroke="transparent"/>
                    <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="20" stroke={color} strokeDasharray="251.2" strokeDashoffset={to_svg_degrees(mark_degrees)}/>
                    <text x="35" y="50" fill="black" fontSize="20">{props.mean.toFixed(2)}</text>
                </svg>
            </CardTitle>
        </Card>
    );
}
