"use client"
import {Marked} from "marked"
import {markedHighlight} from "marked-highlight"
import hljs from "highlight.js"
import xss, {getDefaultWhiteList} from "xss"
import "highlight.js/styles/github-dark.min.css"

const MarkdownRenderer = ({markdownText}: {markdownText: string}) => {
    const marked = new Marked(
        markedHighlight({
            langPrefix: "hljs language-",
            highlight: (code, language) => {
                if (language && hljs.getLanguage(language)) {
                    return hljs.highlight(code, {
                        language,
                        ignoreIllegals: true,
                    }).value
                }
                return hljs.highlightAuto(code).value
            },
        })
    )

    return (
        <div className="prose max-w-none markdown-content">
            <div
                dangerouslySetInnerHTML={{
                    __html: xss(marked.parse(markdownText) as string, {
                      whiteList: {
                        ...getDefaultWhiteList(),
                        span: ['class'],
                      },
                      stripIgnoreTag: true,
                      stripIgnoreTagBody: ['script'],
                    }),
                }}
            />
        </div>
    )
}

export default MarkdownRenderer

