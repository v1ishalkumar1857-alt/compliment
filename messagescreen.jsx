import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MoveRight } from "lucide-react"

const message = `
I just wanted to tell you something... you really are special in a way that’s hard to explain.  
There’s a softness in the way you talk, a sweetness in the way you smile, and something genuine about you that just feels good to be around.  
You don’t try to be anything extra, you’re just you, and that’s what makes you so lovely.
`

export default function MessageScreen({ onNext }) {
    const [isOpen, setIsOpen] = useState(false)
    const [showText, setShowText] = useState(false)
    const [currentText, setCurrentText] = useState("")
    const [showCursor, setShowCursor] = useState(true)
    const scrollRef = useRef(null)

    useEffect(() => {
        if (showText) {
            let index = 0
            const timer = setInterval(() => {
                if (index < message.length) {
                    setCurrentText(message.slice(0, index + 1))
                    index++

                    if (scrollRef.current) {
                        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                    }
                } else {
                    clearInterval(timer)
                    setShowCursor(false)
                }
            }, 5)

            return () => clearInterval(timer)
        }
    }, [showText, message])

    const handleOpenLetter = () => {
        setIsOpen(true)
        setTimeout(() => {
            setShowText(true)
        }, 800)
    }

    const handleReset = () => {
        setIsOpen(false)
        setShowText(false)
        setCurrentText("")
        setShowCursor(true)
    }
