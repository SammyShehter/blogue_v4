import ollama from "ollama"

export const answer = async (question) => {
    const response = await ollama.chat({
        model: 'llama2',
        messages: [{ role: 'user', content: question }],
    })
    
    return response.message.content
}
