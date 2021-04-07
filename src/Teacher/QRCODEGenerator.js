import React from 'react'
import QRCode from "react-qr-code";

const QRCODEGenerator = ({value}) => {
    return (
        <div>
            <QRCode size={650} value={value} />
        </div>
    )
}

export default QRCODEGenerator
