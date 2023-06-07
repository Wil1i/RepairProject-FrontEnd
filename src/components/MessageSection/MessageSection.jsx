import React, { useContext, useRef, useEffect } from 'react'

import AuthContext from '../../context/AuthContext'
import { post } from '../../utility'

function MessageSection({ setTickets, ticket, bottomRef }) {
  const authcontext = useContext(AuthContext)
  const sendMessageRef = useRef()

  useEffect(() => {
    bottomRef.current.scrollTop = bottomRef.current.scrollHeight
  }, [ticket])

  function sendMassageHandler(ticketId) {
    if (sendMessageRef.current.value.length > 0) {
      post('/tickets/messages/new',
        {
          ticketId,
          text: sendMessageRef.current.value,
          token: authcontext.userToken
        }
      ).then(response => {
        bottomRef.current.scrollTop = bottomRef.current.scrollHeight + 100
        setTickets((prev) => {
          const mapedTickets = prev.map(ticket => {
            if (ticket.id === ticketId) {
              ticket.messages = response.data.messages
              return ticket
            }
            return ticket
          })

          return mapedTickets
        })

        sendMessageRef.current.value = ''
      }).catch((err) => {
        toast.error(err.response.data.err)
      })
    }
  }

  return (
    <div className='bg-white w-full h-full absolute top-0 left-0 rounded-xl
      flex justify-center items-center'>

      <div className="bg-blue-500 w-full h-12 flex justify-between items-center
        rounded-t-xl px-6 absolute top-0 left-0 z-50">
        <span className='text-white sansbold'>
          {ticket.subject}
        </span>
        <span className='text-white sansbold'>{ticket.id} #</span>
      </div>

      <div
        className="w-full h-full mt-auto overflow-y-scroll px-3 pt-[3.75rem] pb-[4.75rem]"
        ref={bottomRef}
      >
        {
          ticket.messages ? (
            ticket.messages.map(message => {
              return message.isSupport ? (
                <div key={message.id} className="w-full flex justify-end p-1">
                  <div className="bg-blue-200 w-max max-w-[80%] p-3 rounded-md relative mt-5">
                    <span className='text-blue-500 text-xs absolute left-2 -top-5'>پشتیبان</span>
                    <p className='text-sm break-words
                      sm:text-base'>{message.text}</p>
                  </div>
                </div>
              ) : (
                <div key={message.id} className="w-full p-1">
                  <div className="bg-green-200 w-max max-w-[80%] p-3 rounded-md">
                    <p className='text-sm break-words
                      sm:text-base'>{message.text}</p>
                  </div>
                </div>
              )
            })
          ) : ''
        }
      </div>

      <div className="bg-white w-full h-16 flex justify-between items-center gap-3 p-3
        rounded-b-xl absolute bottom-0 left-0">
        <button
          className='bg-blue-500 text-white w-16 h-12 rounded-full
            flex justify-center items-center'
          onClick={() => sendMassageHandler(ticket.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
        <div className='w-full bg-input'>
          <input
            className='input rounded-xl'
            type="text"
            placeholder='تایپ کنید'
            ref={sendMessageRef}
          />
        </div>
      </div>

    </div>
  )
}

export default MessageSection