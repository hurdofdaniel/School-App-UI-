import React, { useEffect, useState } from 'react';
import './quickLinks.css'

interface quickLinksLink {
    name: string,
    link: string,
    icon: string,
}

let quickLinksLinkArray: quickLinksLink[] = [
    {
        name: "Google",
        link: "https://www.google.com",
        // use font awesome for icon options
        icon: "🌍",
    }
];

function fetchQuickLinks() {
    return quickLinksLinkArray;
}

function QuickLinks() {
    const [quickLinks] = useState(fetchQuickLinks());
    const [renderLink, setRenderLinks] = useState<JSX.Element[]>();

    useEffect(() => {
        function loadLinks() {
            let renderContent = [];

            for (let i = 0; i < quickLinks.length; i++) {
                renderContent.push(
                    <button key={i} onClick={() => window.open(quickLinks[i].link, "_blank")}>{quickLinks[i].icon} {quickLinks[i].name}</button>
                );
            }

            setRenderLinks(renderContent);
        }

        loadLinks();
    }, [quickLinks]);

    return (
        <div className="header-item header-links">
            <div className="header-text"><div className='ico ico-quick-links'></div> Quick Links</div>
            <div className="quick-links-content">
                <div className="quick-links-buttons">
                    {renderLink}
                </div>
            </div>
        </div>
    );
}

export default QuickLinks;