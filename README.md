# Claude Chat - Demo Version

A modern AI chatbot interface built with Next.js 14, currently running with mock responses for demonstration purposes.

## 🚀 Features

- **Modern Chat Interface** - Clean, responsive design inspired by popular chat applications
- **Real-time Messaging** - Smooth message sending and receiving with typing indicators
- **Dark/Light Mode** - Toggle between themes with system preference support
- **Message Management** - Copy messages, retry failed sends, clear chat history
- **Export Functionality** - Download chat history as JSON
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Accessibility** - Full keyboard navigation and screen reader support

## 🎯 Current Status

This is a **demo version** with a mock backend that provides sample responses. The UI is fully functional and ready for integration with the actual Claude API.

### Mock Features Active:
- ✅ Complete chat interface
- ✅ Message history and persistence
- ✅ Typing indicators and animations
- ✅ Theme switching
- ✅ Export functionality
- ✅ Error handling and retry mechanisms
- ✅ Responsive design

### Ready for Integration:
- 🔄 Claude Sonnet 4 API connection
- 🔄 Real AI responses
- 🔄 Conversation context
- 🔄 Advanced features (file upload, etc.)

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes
- **TypeScript**: Full type safety

## 🚀 Getting Started

1. **Clone and install**:
   \`\`\`bash
   git clone <repository-url>
   cd claude-chatbot-demo
   npm install
   \`\`\`

2. **Run development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open in browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## 🎨 UI Features

### Chat Interface
- **Welcome Screen**: Engaging introduction with sample prompts
- **Message Bubbles**: Distinct styling for user and AI messages
- **Timestamps**: Clear message timing
- **Status Indicators**: Visual feedback for message states

### Interactive Elements
- **Copy Messages**: One-click copying to clipboard
- **Retry Failed Messages**: Easy error recovery
- **Export Chat**: Download conversation history
- **Clear Chat**: Reset conversation

### Responsive Design
- **Mobile Optimized**: Touch-friendly interface
- **Desktop Enhanced**: Full-featured experience
- **Tablet Support**: Adaptive layout

## 🔧 Customization

### Themes
The app supports light, dark, and system themes with smooth transitions.

### Mock Responses
Current mock responses demonstrate:
- Contextual replies based on user input
- Markdown formatting support
- Code block rendering
- Multi-paragraph responses

### Styling
Built with Tailwind CSS and CSS custom properties for easy theming.

## 🚀 Production Ready

To connect to the actual Claude API:

1. **Install Anthropic SDK**:
   \`\`\`bash
   npm install @anthropic-ai/sdk
   \`\`\`

2. **Add environment variable**:
   \`\`\`
   ANTHROPIC_API_KEY=your_api_key_here
   \`\`\`

3. **Update API route**: Replace mock logic in \`app/api/chat/route.ts\`

## 📱 Try It Out

The demo includes several interactive features:

- **Send Messages**: Type and send messages to see mock responses
- **Theme Toggle**: Switch between light and dark modes
- **Export Chat**: Download your conversation as JSON
- **Copy Messages**: Click the copy button on any message
- **Retry Messages**: Use the retry button for failed messages

## 🎯 Next Steps

1. **API Integration**: Connect to Claude Sonnet 4
2. **Enhanced Features**: Add file upload, voice input
3. **Persistence**: Add database for conversation history
4. **Authentication**: User accounts and saved conversations
5. **Advanced UI**: Message search, conversation branching

## 📄 License

MIT License - see LICENSE file for details.
\`\`\`
