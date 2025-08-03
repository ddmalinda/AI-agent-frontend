
const formatMessageText = (text: string) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')     // Bold text
        .replace(/\*(.*?)\*/g, '<em>$1</em>')                 // Italic text
        .replace(/~~(.*?)~~/g, '<del>$1</del>')               // Strikethrough
        .replace(/__(.*?)__/g, '<u>$1</u>')                   // Underline
        .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>') // Inline code
        .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded-lg overflow-x-auto"><code>$1</code></pre>') // Code blocks
        .replace(/^\* (.+)$/gm, '<li>$1</li>')                // List items
        .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-4">$1</ul>') // Wrap list items
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')             // Numbered list items
        .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold">$1</h1>') // H1
        .replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold">$1</h2>') // H2
        .replace(/^### (.+)$/gm, '<h3 class="text-base font-medium">$1</h3>') // H3
        .replace(/\[(.+?)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">$1</a>') // Links
        .replace(/\n\n/g, '</p><p>')                          // Paragraphs
        .replace(/\n/g, '<br>')                               // Line breaks
        .replace(/^(.*)$/, '<p>$1</p>')                       // Wrap in paragraph
}

export default formatMessageText;