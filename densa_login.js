let DEBUG = false
const zoid = require('zoid/dist/zoid.frameworks')
const { dom, node } = require('jsx-pragmatic')
if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
    DEBUG = true
}
let DENSA_AUTH = ""
if (DEBUG) {
    DENSA_AUTH = "http://localhost:8081"
}

const CLASS = {
    OUTLET: "outlet",
    VISIBLE: "visible",
    INVISIBLE: "invisible",
    COMPONENT_FRAME: "component-frame",
    PRERENDER_FRAME: "prerender-frame"
};

class densa {
    LoginComponent = zoid.create({
        tag: 'my-login-component',
        url: DENSA_AUTH,
        props: {
            onLogin: {
                type: 'function',
                required: true
            },
            clientId: {
                type: 'string',
                required: false
            },
            next_page: {
                type: 'string',
                required: false
            }
        },
        containerTemplate: function containerTemplate({ uid, tag, context, focus, close, doc, frame, prerenderFrame }) {
            function closeComponent(event) {
                event.preventDefault();
                event.stopPropagation();
                close();
            }

            function focusComponent(event) {
                event.preventDefault();
                event.stopPropagation();
                return focus();
            }

            prerenderFrame.classList.add(CLASS.INVISIBLE);
            return node('div',
                {
                    id: uid, 'onClick': focusComponent,
                    'class': `${tag} ${tag}-context-${context} ${tag}-focus`
                },

                node('a',
                    {
                        'href': '#', 'onClick': closeComponent,
                        'class': `${tag}-close`
                    }),

                node('style', null, `
                #${uid} {
                    position: fixed;
                    top: 0;
                    left: 0px;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 9999999;
                    -webkit-box-pack: center;
                    -webkit-justify-content: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    -ms-flex-align: center;
                    align-items: center;
                    display: flex;
                }
                #${uid} > iframe.${CLASS.INVISIBLE} {
                    display: none;
                  }
        
                #${uid} > iframe {
                    height: 100%;
                    width: 100%;
                    webkit-box-pack: center;
                    -webkit-justify-content: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    -ms-flex-align: center;
                    align-items: center;
                }
                body{
                    background: #ffffff;
                    max-width: 1000px;
                    width: 100%;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    position: relative;
                }
                #${uid}.${tag}-context-${zoid.CONTEXT.POPUP} {
                    cursor: pointer;
                }

                #${uid} .${tag}-close {
                    position: absolute;
                    right: 16px;
                    top: 16px;
                    width: 16px;
                    height: 16px;
                    opacity: 0.6;
                }

                #${uid} .${tag}-close:hover {
                    opacity: 1;
                }

                #${uid} .${tag}-close:before,
                #${uid} .${tag}-close:after {
                    position: absolute;
                    left: 8px;
                    content: ' ';
                    height: 16px;
                    width: 2px;
                    background-color: white;
                }

                #${uid} .${tag}-close:before {
                    transform: rotate(45deg);
                }

                #${uid} .${tag}-close:after {
                    transform: rotate(-45deg);
                }
            `),

                node('node', { el: frame }),
                node('node', { el: prerenderFrame })
            ).render(dom({ doc }));
        }

    });
}

export default LoginComponent