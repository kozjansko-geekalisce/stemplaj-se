import { Request } from 'express'

export function processMessagesForTemplate(request: Request) {
  const messages = request.session.messages || []
  request.session.messages = []
  return messages.map((message) => {
    const [text, type] = message.split('__TYPE__')
    return { text, type: type || 'danger' }
  })
}

type MessageType = 'info' | 'warning' | 'danger' | 'success'

export function flashMessage(
  request: Request,
  text: string,
  type: MessageType = 'info'
) {
  request.session.messages = request.session.messages || []
  request.session.messages.push(`${text}__TYPE__${type}`)
}
