import React, { SyntheticEvent } from "react";
import Draggable from "react-draggable";
import './confirmpurchase.css';
import CatalogueItem from "../../bobba/catalogue/CatalogueItem";
import { canvas2Image } from "../misc/GraphicsUtilities";

type ConfirmPurchaseProps = {
    item: CatalogueItem,
    onClose: () => void,
    onPurchase: (amount: number) => void,
    zIndex: number,
};
type ConfirmPurchaseState = {
    visible: boolean,
    amount: number
};
const initialState: ConfirmPurchaseState = {
    visible: true,
    amount: 1
};

export default class ConfirmPurchase extends React.Component<ConfirmPurchaseProps, ConfirmPurchaseState> {

    constructor(props: ConfirmPurchaseProps) {
        super(props);
        this.state = initialState;
    }
    handleInputChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        this.setState({
            ...this.state,
            amount: parseInt(value),
        });
    }
    handlePurchase = () => {
        const { onPurchase } = this.props
        onPurchase(this.state.amount)
    }

    render() {
        const { item, onClose, zIndex } = this.props;
        if (item.baseItem == null) {
            return <></>;
        }
        const image = canvas2Image(item.baseItem.iconImage);
        return (
            <Draggable handle=".handle">
                <div className="catalogue_confirm_purchase" style={{ zIndex }}>
                    <button className="close" onClick={onClose}>
                        X
                    </button>
                    <h2 className="handle">Confirmar compra</h2>
                    <hr />
                    <div className="wrapper">
                        <div className="first_row">
                            <button>
                                <img src={image.src} alt={item.baseItem.furniBase.itemData.name} />
                            </button>
                            <h2>
                                {item.baseItem.furniBase.itemData.name}
                            </h2>
                            <input type="number" onChange={this.handleInputChange} value={this.state.amount} />
                        </div>
                        <div className="second_row">
                            <p>
                                {item.baseItem.furniBase.itemData.name} cuesta {item.cost} crédito{item.cost === 1 ? '' : 's'}.
                            </p>
                            <p>
                                Tienes 420 créditos.
                            </p>
                        </div>
                        <div className="third_row">
                            <button onClick={this.handlePurchase}>Comprar</button>
                            <button>Regalar</button>
                            <button onClick={onClose}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}