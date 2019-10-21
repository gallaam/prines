import React, { Component } from "react";
import Collapsible from "react-collapsible";
import Popup from "reactjs-popup";

import DelayLink from "../../../helpers/delayLink";

class UserMenu extends Component {
    render() {
        const { pages } = this.props;
        return (
            <React.Fragment>
                <Collapsible
                    trigger={localStorage.getItem("accountMyAccount")}
                    transitionTime={200}
                >
                    <DelayLink to={"/my-addresses"} delay={200}>
                        <div className="display-flex">
                            <div className="mr-10 border-0">
                                <i className="si si-home" />
                            </div>
                            <div className="flex-auto border-0">
                                {localStorage.getItem("accountManageAddress")}
                            </div>
                            <div className="flex-auto text-right">
                                <i className="si si-arrow-right" />
                            </div>
                        </div>
                    </DelayLink>
                    <DelayLink to={"/my-orders"} delay={200}>
                        <div className="display-flex">
                            <div className="mr-10 border-0">
                                <i className="si si-basket-loaded" />
                            </div>
                            <div className="flex-auto border-0">
                                {localStorage.getItem("accountMyOrders")}
                            </div>
                            <div className="flex-auto text-right">
                                <i className="si si-arrow-right" />
                            </div>
                        </div>
                    </DelayLink>
                </Collapsible>
                <Collapsible trigger={localStorage.getItem("accountHelpFaq")} transitionTime={200}>
                    {pages.map(page => (
                        <React.Fragment key={page.id}>
                            <Popup
                                trigger={
                                    <div className="display-flex">
                                        <div className="flex-auto border-0">{page.name}</div>
                                        <div className="flex-auto text-right">
                                            <i className="si si-arrow-right" />
                                        </div>
                                    </div>
                                }
                                modal
                                closeOnDocumentClick
                            >
                                {close => (
                                    <div className="pages-modal">
                                        <div
                                            onClick={close}
                                            className="close-modal-header text-right"
                                        >
                                            <span className="close-modal-icon">&times;</span>
                                        </div>
                                        <div
                                            className="mt-50"
                                            dangerouslySetInnerHTML={{ __html: page.body }}
                                        />
                                    </div>
                                )}
                            </Popup>
                        </React.Fragment>
                    ))}
                </Collapsible>
            </React.Fragment>
        );
    }
}

export default UserMenu;
