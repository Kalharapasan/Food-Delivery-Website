import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <div className="app-download-text">
                <h2>
                    Order faster with<br />our mobile app
                </h2>
                <p>
                    Track your orders in real-time, save your favourites, and get exclusive app-only deals. Available on iOS and Android.
                </p>
                <div className="app-store-buttons">
                    <div className="store-btn">
                        <span className="store-icon">▶</span>
                        <div className="store-btn-text">
                            <small>GET IT ON</small>
                            <strong>Google Play</strong>
                        </div>
                    </div>
                    <div className="store-btn">
                        <span className="store-icon">🍎</span>
                        <div className="store-btn-text">
                            <small>DOWNLOAD ON THE</small>
                            <strong>App Store</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AppDownload