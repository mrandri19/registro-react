import * as React from "react";
import { Footer, FooterSection } from "react-mdl";

export function MyFooter(props: any) {
    return (
        <Footer id="footer" size="mini">
            <FooterSection type="left">
                <p>Built with ♥ by <a href="#">Andrea Cognolato</a> and <a href="#">Daniele Monteleone</a></p>
            </FooterSection>
        </Footer>
    );
}
