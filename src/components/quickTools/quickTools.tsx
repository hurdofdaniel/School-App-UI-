import React, { createElement, useEffect, useState } from 'react';
import './quickTools.css'

let openTool = "";
let currentOpenTool = "";

function openQuickTools(tool: string) {
    if (currentOpenTool !== "") {
        closeQuickTools();
    }

    if (openTool != "" && openTool === currentOpenTool) {
        openTool = "";
        closeQuickTools();
        return;
    }

    if (tool !== openTool) {
        openTool = tool;
        (document.getElementById(`quick-tools-app-${openTool}`) as HTMLDivElement).style.display = "block";
        (document.getElementsByClassName(`quick-tools-tool`)[0] as HTMLDivElement).style.display = "block";
        currentOpenTool = openTool;
    }
}

function closeQuickTools() {
    if (currentOpenTool === null || currentOpenTool === openTool) {
        return;
    }

    if (openTool === "") {
        (document.getElementById(`quick-tools-app-${currentOpenTool}`) as HTMLDivElement).style.display = "none";
        (document.getElementsByClassName(`quick-tools-tool`)[0] as HTMLDivElement).style.display = "none";
        currentOpenTool = openTool;
    } else {
        (document.getElementById(`quick-tools-app-${openTool}`) as HTMLDivElement).style.display = "block";
        (document.getElementById(`quick-tools-app-${currentOpenTool}`) as HTMLDivElement).style.display = "none";
        currentOpenTool = openTool;
    }
}

interface quickToolsElementAttributes {
    name: string,
    value: any,
}

interface quickToolsElement {
    elementName: string,
    elementText: string | null,
    elementAttributes: quickToolsElementAttributes[],
    elementChilds: quickToolsElement[],
}

interface quickToolsRoot {
    toolName: string,
    toolIcon: string,
    element: quickToolsElement,
}

let quickToolsItems: quickToolsRoot[] = [
    {
        toolName: "Calculator",
        toolIcon: "🧮",
        element: {
            elementName: 'div',
            elementText: null,
            elementAttributes: [
                {
                    name: "id",
                    value: "quick-tools-app-Calculator",
                }
            ],
            elementChilds: [
                {
                    elementName: 'style',
                    elementText: `.calculator-row {
                        display: inline-flex;
                        width: 100%;
                        justify-content: space-between;
                    }
                    
                    .calculator-row > p {
                        margin: 0;
                    }
                    
                    .calculator-row > input {
                        width: 66%;
                        border-radius: 0.9375rem;
                        border: none;
                        color: var(--current-text);
                        background-color: var(--current-card);
                        box-shadow: 0rem 0rem 0.3125rem var(--current-shadow);
                        filter: drop-shadow(0rem 0.3125rem 0.9375rem var(--current-shadow-hover));
                        outline: none;
                        padding-left: 0.25rem;
                        padding-right: 0.25rem;
                        user-select: none;
                        
                    }
                    
                    .calculator-row > button {
                        font-size: 0.75rem;
                        /*margin-bottom: 0.325rem;*/
                        border: none;
                        background-color: var(--current-card);
                        border-radius: 0.46875rem;
                        filter: drop-shadow(0rem 0.3125rem 0.375rem var(--current-shadow));
                        width: 1.25rem;
                        height: 1rem;
                        cursor: pointer;
                    }`,
                    elementAttributes: [],
                    elementChilds: [],
                },
                {
                    elementName: 'div',
                    elementText: null,
                    elementAttributes: [
                        {
                            name: 'className',
                            value: 'calculator-content',
                        },
                    ],
                    elementChilds: [
                        {
                            elementName: 'div',
                            elementText: null,
                            elementAttributes: [
                                {
                                    name: 'className',
                                    value: 'calculator-row',
                                }
                            ],
                            elementChilds: [
                                {
                                    elementName: 'input',
                                    elementText: null,
                                    elementAttributes: [
                                        {
                                            name: 'type',
                                            value: 'text',
                                        },
                                        {
                                            name: 'id',
                                            value: 'calc-output',
                                        },
                                        {
                                            name: 'placeholder',
                                            value: 'Calculator',
                                        },
                                        {
                                            name: 'readOnly',
                                            value: true,
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: 'C',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => {
                                                if ((document.getElementById("calc-output") as HTMLInputElement).value === "") {
                                                    openTool = "";
                                                    closeQuickTools();
                                                }

                                                (document.getElementById("calc-output") as HTMLInputElement).value = "";
                                            },
                                        },
                                    ],
                                    elementChilds: [],
                                },
                            ],
                        },
                        {
                            elementName: 'div',
                            elementText: null,
                            elementAttributes: [
                                {
                                    name: 'className',
                                    value: 'calculator-row',
                                }
                            ],
                            elementChilds: [
                                {
                                    elementName: 'button',
                                    elementText: '7',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += "7",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: '8',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += "8",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: '9',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += "9",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: 'X',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += " X ",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                            ],
                        },
                        {
                            elementName: 'div',
                            elementText: null,
                            elementAttributes: [
                                {
                                    name: 'className',
                                    value: 'calculator-row',
                                }
                            ],
                            elementChilds: [
                                {
                                    elementName: 'button',
                                    elementText: '4',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += "4",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: '5',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += "5",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: '6',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += "6",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: '-',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += " - ",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                            ],
                        },
                        {
                            elementName: 'div',
                            elementText: null,
                            elementAttributes: [
                                {
                                    name: 'className',
                                    value: 'calculator-row',
                                }
                            ],
                            elementChilds: [
                                {
                                    elementName: 'button',
                                    elementText: '1',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += "1",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: '2',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += "2",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: '3',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += "3",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: '+',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += " + ",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                            ],
                        },
                        {
                            elementName: 'div',
                            elementText: null,
                            elementAttributes: [
                                {
                                    name: 'className',
                                    value: 'calculator-row',
                                }
                            ],
                            elementChilds: [
                                {
                                    elementName: 'button',
                                    elementText: '0',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += "0",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: '.',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += ".",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: '=',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => {
                                                (document.getElementById("calc-output") as HTMLInputElement).value = 
                                                    (Math.round((eval((document.getElementById("calc-output") as HTMLInputElement).value.replace(" ", "").replace("÷", "/").replace("X", "*")) + Number.EPSILON) * 100) / 100).toString();
                                            },
                                        },
                                    ],
                                    elementChilds: [],
                                },
                                {
                                    elementName: 'button',
                                    elementText: '÷',
                                    elementAttributes: [
                                        {
                                            name: 'onClick',
                                            value: () => (document.getElementById("calc-output") as HTMLInputElement).value += " ÷ ",
                                        },
                                    ],
                                    elementChilds: [],
                                },
                            ],
                        },
                    ],
                }
            ],
        }
    },
]

function fetchQuickTools() {
    return quickToolsItems
}

// Close function does not work
// I believe I could make a public function with the same name
// Or use bind??
function QuickTools() {
    const [quickTools, setQuickTools] = useState(fetchQuickTools());
    const [renderItems, setRenderItems] = useState<JSX.Element[]>();

    const [renderButtons, setRenderButtons] = useState<JSX.Element[]>();

    useEffect(() => {
        function loadQuickTools() {
            let quickToolsElementArray = [];
            let quickToolsButtonsArray = [];

            for (let i = 0; i < quickTools.length; i++) {
                quickToolsButtonsArray.push(
                    <button key={`quick-tools-button-${i}`} onClick={() => openQuickTools(`${quickTools[i].toolName}`)}>{quickTools[i].toolIcon} {quickTools[i].toolName}</button>
                );

                let quickToolsElement = quickTools[i].element;
                let quickToolsElementAttributes = quickTools[i].element.elementAttributes;
                let quickToolsElementAttributesArray: any = {};

                quickToolsElementAttributesArray["key"] = `quick-tools-element-${i}`;
                quickToolsElementAttributesArray["style"] = {display: "none"};
                for (let x = 0; x < quickToolsElementAttributes.length; x++) {
                    quickToolsElementAttributesArray[quickToolsElementAttributes[x].name] = quickToolsElementAttributes[x].value;
                }

                let quickToolsElementChilds = quickTools[i].element.elementChilds;

                let quickToolsElementsChildsElements = [];

                for (let x = 0; x < quickToolsElementChilds.length; x++) {
                    quickToolsElementsChildsElements.push(createChildElements(quickToolsElementChilds[x], x));
                }

                var rootElement = createElement(quickToolsElement.elementName, 
                                                quickToolsElementAttributesArray, 
                                                quickToolsElement.elementText, 
                                                quickToolsElementsChildsElements);
                
                quickToolsElementArray.push(rootElement);
            }
            
            setRenderItems(quickToolsElementArray);
            setRenderButtons(quickToolsButtonsArray);
        }

        function createChildElements(childElementsParam: quickToolsElement, index: number) {
            let child = childElementsParam;
            let quickToolsElementAttributes = child.elementAttributes;
            let quickToolsElementAttributesArray: any = {};

            quickToolsElementAttributesArray['key'] = index;
            for (let x = 0; x < quickToolsElementAttributes.length; x++) {
                quickToolsElementAttributesArray[quickToolsElementAttributes[x].name] = quickToolsElementAttributes[x].value;
            }

            if (child.elementChilds.length === 0) {
                let childElement: any = createElement(child.elementName, quickToolsElementAttributesArray, child.elementText);
                return childElement;
            }

            let childElementsChildsElements = [];

            for (let i = 0; i < child.elementChilds.length; i++) {
                childElementsChildsElements.push(createChildElements(child.elementChilds[i], i));
            
                if (i === child.elementChilds.length - 1) {
                    let childElement: any = createElement(child.elementName, quickToolsElementAttributesArray, child.elementText, childElementsChildsElements);
                    return childElement;
                }
            }
        }

        loadQuickTools();
    }, [quickTools])

    return (
        <div className="header-item header-tools">
            <div className="header-text"><div className='ico ico-quick-tools'></div> Quick Tools</div>
            <div className="quick-tools-content">
                    <div className="quick-tools-buttons">
                        {renderButtons}
                    </div>
                    <div className="quick-tools-tool">
                        {renderItems}
                    </div>
                </div>
        </div>
    );
}

export default QuickTools;