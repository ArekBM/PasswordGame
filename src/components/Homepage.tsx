import TextArea from './TextArea'
import Card from './Card'
import { useState, useRef, useEffect } from 'react'
import {captchas} from './Captcha'
import { puzzles } from './ChessPuzzles'
// import Maps from './Maps'
// import { LoadScript } from '@react-google-maps/api'
// import { is69, getVideoDetails } from './Youtube'

interface Question {
    id: number
    text: string
    refresh?: Function;
    isTrue: (inputValue: string) => boolean
}

export default function Home(){
    //TODO
    // Render previous questions and update if false 

    const randomIndex = () => {
        return Math.floor(Math.random() * captchas.length)
    }

    let index = randomIndex()

    const refreshCaptcha = () => {
        setCaptcha(captchas[randomIndex()].val)
    }

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const [passwordInput, setPasswordInput] = useState('')

    const [fireFlag, setFireFlag] = useState(false)

    const [captcha, setCaptcha] = useState(captchas[index].val)

    const [trueQs, setTrueQs] = useState<Question[]>([])

    const [falseQs, setFalseQs] = useState<Question[]>([])

    const questionIndex = useRef(0)

    const questions: Question[] = [
        {
            id: 0,
            text: 'Your password must be at least 5 characters',
            isTrue: (inputValue): boolean => {
                if(inputValue.length >= 5){
                    return true
                }
                return false
            }
        },
        {
            id: 1,
            text: 'Your password must contain a number',
            isTrue: (inputValue): boolean => {
                for(let i = 0; i < inputValue.length; i++) {
                    let code = inputValue.charCodeAt(i);
                    if((code > 47 && code < 58)){
                    return true }
                }
                return false
            }
        },
        {
            id: 2,
            text: 'Your password must contain a special character',
            isTrue: (inputValue): boolean => {
                for(let i = 0; i < inputValue.length; i++) {
                    let code = inputValue.charCodeAt(i);
                    if(!(code > 47 && code < 58) &&
                    !(code > 64 && code < 91) &&
                    !(code > 96 && code < 123)) {
                    return true }
                }
                return false
            }
        },
        {
            id: 3,
            text: 'Your password must contain an uppercase letter',
            isTrue: (inputValue): boolean => {
                for(let i = 0; i < inputValue.length; i++){
                    let code = inputValue.charCodeAt(i);
                    if((code > 64 && code < 91)){
                    return true}
                }
                return false
            }
        },
        {
            id: 4,
            text: 'The digits in your password must add up to 25',
            isTrue: (inputValue): boolean => {
                //currently only counts ONCE 
                let total = 0
                for(let i = 0; i < inputValue.length; i++){
                    let number = inputValue.charCodeAt(i)
                    if(number > 47 && number < 58){
                        const digitValue = number - 48
                        total += digitValue
                    }
                }
                if(total === 25){
                    return true
                }
                return false
            }
        },
        {
            id: 5,
            text: 'Your password must include a month of the year',
            isTrue: (inputValue): boolean => {
                const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
                
                const lowerCaseInput = inputValue.toLowerCase()
                for(const month of months){
                    if(lowerCaseInput.includes(month)){
                        return true
                    }
                }
                return false
            }
        },
        {
            id: 6,
            text: 'Your password must include one of our sponsors:',
            isTrue: (inputValue): boolean => {
                const sponsors = ['pepsi', 'starbucks', 'shell']

                const lowerCaseInput = inputValue.toLowerCase()
                for(const sponsor of sponsors){
                    if(lowerCaseInput.includes(sponsor)){
                        return true
                    }
                }
                return false
            }
        },
        {
            id: 7,
            text: 'The roman numerals in your password should multiply to 35',
            isTrue: (inputValue): boolean => {
                if(checkProductEquals35(inputValue)){
                    return true
                }
                return false
            }
        },
        {
            id: 8,
            text: `Your password must include this CAPTCHA: ${captcha}`,
            refresh: refreshCaptcha,
            isTrue: (inputValue): boolean => {

                if(inputValue.includes(captcha)){

                    return true
                }
                return false
            }
        },
        // {
        //     id: 9,
        //     text: 'Your password must include today\'s wordle answer',
        //     isTrue: (): boolean => {
        //         return true
        //     }
        // },
        {
            id: 10,
            text: 'Your password must include a two letter symbol from the periodic table',
            isTrue: (inputValue): boolean => {

                const elements = [
                'He', 'Li', 'Be', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'Cl', 'Ar', 'Ca', 'Sc', 'Ti', 'Cr', 'Mn', 'Fe', 'Co', 
                'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 
                'In', 'Sn', 'Sb', 'Te', 'Xe', 'Cs', 'Ba', 'La', 'Hf', 'Ta', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 
                'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og',
                'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Th', 'Pa', 'Np', 'Pu', 'Am', 'Cm', 
                'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr'
                ]

                for(const element of elements){
                    if(inputValue.includes(element)){

                        return true
                    }
                }
                return false
            }
        },
        // {
        //     id: 11,
        //     text: 'Your password must include the current phase of the moon as an emoji',
        //     isTrue: (): boolean => {
        //         return true
        //     }
        // },
        {
            id: 12,
            text: 'Your password must include a leap year',
            isTrue: (inputValue): boolean => {
                let currentNumber = ''
                let hasLeapYear = false

                for(const c of inputValue) {
                    if(!isNaN(parseInt(c))){
                        currentNumber += c
                        const num = parseInt(currentNumber)
                        if(isLeapYear(num)){
                            hasLeapYear = true
                            break
                        }
                        currentNumber = ''
                    }
                } 
                if(hasLeapYear === true){
                    return true
                }
                return false
            }
        },
        {
            id: 13,
            text: 'Your password must include the best move in algebraic chess notation',
            isTrue: (inputValue): boolean => {
                for(const puzzle of puzzles){
                    if(inputValue.includes(puzzle.val)){
                        return true
                    }
                }
                return false
            }
        },
        {
            id: 14,
            text: '🥚 - This is my chicken Paul, He hasn\'t hatched yet, please put him in your password and keep him safe.',
            isTrue: (inputValue): boolean => {
                if(inputValue.includes('🥚')){
                    return true
                }
                return false
            }
        },
        {
            id: 15,
            text: 'The elements in your password must have atomic numbers that add up to 200',
            isTrue: (inputValue): boolean => {

                let result = 0

                const elementsArr = checkElementVal(inputValue)

                for(const element of elementsArr){
                    result += elementToAtomic(element)
                }
                if(result === 200){
                    questionIndex.current = 16
                    return true
                }
                return false
            } 
        },
        {
            id: 16,
            text: 'Oh no! Your password is on fire! Quick, put it out!',
            isTrue: (inputValue): boolean => {
                if(inputValue.includes('🔥')){
                    return false
                } else {
                    return true
                }
            }
        },
        {
            id: 17,
            text: 'Paul has now hatched, please remember to feed him.',
            isTrue: (inputValue): boolean =>  {
                if(questionIndex.current === 17){
                    const paulHatched = inputValue.replace('🥚', '🐣')
                    setPasswordInput(paulHatched)
                }
                // Make function pop up window displaying catepillar, once copied then move to next 
                if(inputValue.includes('🐛')){
                    return true
                }
                return false
            }
        }, 
        // {
        //     id: 18,
        //     text: 'A sacrifice must be made. Pick 2 letters that you will no longer be able to use.',
        //     isTrue: (): boolean => {
        //         return true
        //     }
        // },
        {
            id: 19, 
            text: 'Your password must include the length of your password',
            isTrue:(inputValue): boolean => {
                if(inputValue.includes(`${inputValue.length}`)){
                    return true
                } else {
                    return false
                }
            },
        },
        {
            id: 20,
            text: 'The length of your password must be a prime number',
            isTrue: (inputValue): boolean => {
                if(isPrime(inputValue.length) === true){
                    return true
                } else {
                    return false
                }
            }
        },
        {
            id: 21,
            text: 'Your password must include the current time',
            isTrue: (inputValue): boolean => {
                const currentDate = new Date()

                //Can change this logic

                const currentHours = currentDate.getHours().toString().padStart(2, '0')
                const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0')

                const nonMHours = parseInt(currentHours) - 12

                const currentTime = `${currentHours}:${currentMinutes}`
                const nonMTime = `${nonMHours}:${currentMinutes}`
                console.log(currentTime)
                if(inputValue.includes(currentTime) || inputValue.includes(nonMTime)){
                    return true 
                } else {
                    return false
                }
            }
        }
        // {
        //     id: 18,
        //     text: 'Your password must include the URL of a 69 second long Youtube video',
        //     isTrue: (inputValue) => {
        //         if(questionIndex.current === 16)
        //         // getVideoDetails([inputValue])
        //         return true
        //     }
        // }
    ]

    function isLeapYear(year: number): boolean {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
    }

    function elementToAtomic(element: string): number {
        const elementToNumber : { [key: string] : number } = {
            H: 1, He: 2, Li: 3, Be: 4, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10
        }

        let atomicNumber = elementToNumber[element]

        return atomicNumber

    }

    function checkElementVal(inputString: string) {
        // Search by two chars

        const elements : string[] = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F' , 'Ne']
        const elementArr : string[] = []

        let i = 0;
        while( i < inputString.length){
            let found = false
            for(let j = elements.length - 1; j >= 0; j--){
                const element = elements[j]
                if(inputString.startsWith(element, i)){
                    elementArr.push(element)
                    i += element.length
                    found = true
                    break
                }
            }
            if(!found){
                i++
            }
        }
        return elementArr

    }

    function isRomanNumeral(char: string): boolean {
        const romanNumerals: { [key: string]: number } = {
            I: 1,
            V: 5,
            X: 10,
            L: 50,
            C: 100,
            D: 500,
            M: 1000,
        };
        
        return romanNumerals.hasOwnProperty(char);
    }
    
    function convertRomanToNumber(roman: string): number {
        //TODO fix 'VVII' input, currently interpreted as ['VVII'] instead of ['V', 'VII']
        //Possible fix is break loop for double chars specifically for "V"
        const romanNumerals: { [key: string]: number } = {
            I: 1,
            V: 5,
            X: 10,
            L: 50,
            C: 100,
            D: 500,
            M: 1000,
        };
    
        let result = 0;
        let prevValue = 0;
    
        for (let i = roman.length - 1; i >= 0; i--) {
            const currentChar = roman[i];
            const currentValue = romanNumerals[currentChar];
    
            if (currentValue >= prevValue) {
                result += currentValue;
            } else {
                result -= currentValue;
            }
    
            prevValue = currentValue;
        }
    
        return result;
    }
    
    function findValidRomanSubstrings(input: string): string[] {

        const validSubstrings: string[] = [];
        const n = input.length;
    
        for (let i = 0; i < n; i++) {
            let currentSubstr = '';
            let j = i;
    
            while (j < n && isRomanNumeral(input[j])) {
                currentSubstr += input[j];
                j++;
            }
    
            if (currentSubstr.length > 0) {
                validSubstrings.push(currentSubstr);
                i = j - 1; // Skip the checked substrings
            }
        }
    
        return validSubstrings;
    }
    
    function checkProductEquals35(input: string): boolean {
        const validSubstrings = findValidRomanSubstrings(input);
        let product = 1;
    
        for (const substr of validSubstrings) {
            product *= convertRomanToNumber(substr);
        }
    
        return product === 35;
    }

    function isPrime(num: number): boolean {
        if( num <= 1){
            return false
        }
        if( num <= 3){
            return true
        }
        if( num % 2 === 0 || num % 3 === 0){
            return false
        }
        let i = 5
        while(i * i <= num){
            if(num % i === 0 || num % (i + 2) === 0){
                return false
            }
            i += 6
        }
        return true
    }
    
    // const isQConditionMet = (question: Question) => {
    //     return question.isTrue(passwordInput)
    // }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        
        setPasswordInput(e.target.value)
    }

    //Fire start

    useEffect(() => {
        if(questionIndex.current === 16 && !fireFlag){
            const start = Math.floor(Math.random() * passwordInput.length)
            const passwordOnFire = passwordInput.substring(0, start) + '🔥' + passwordInput.substring(start + 1, passwordInput.length)
            setPasswordInput(passwordOnFire)
            setFireFlag(true)
            questionIndex.current = 17
        }
    }, [questionIndex.current])

    //Fire spreading

    useEffect(() => {
        const fire = setInterval(() => {
            if(passwordInput.includes('🔥')){
                let updatedInput = passwordInput                
                //This can be shortened
                if((passwordInput[0].codePointAt(0)?.toString(16) !== 'd83d')){
                    if(Math.random() <= .5){
                        let firstIndex = passwordInput.indexOf('🔥')
                        updatedInput = passwordInput.substring(0, firstIndex - 1) + '🔥' + passwordInput.substring(firstIndex)
                    } else {
                        if(updatedInput[updatedInput.length - 1].codePointAt(0)?.toString(16) != 'dd25'){
                            let lastIndex = updatedInput.lastIndexOf('🔥')
                            let rightDummy = updatedInput.substring(0, lastIndex + 2) + '🔥' + updatedInput.substring(lastIndex + 3)
                            updatedInput = rightDummy
                        }
                    }
                } else {
                    if(updatedInput[updatedInput.length - 1].codePointAt(0)?.toString(16) != 'dd25'){
                        let lastIndex = updatedInput.lastIndexOf('🔥')
                        let rightDummy = updatedInput.substring(0, lastIndex + 2) + '🔥' + updatedInput.substring(lastIndex + 3)
                        updatedInput = rightDummy
                    }
                }
                setPasswordInput(updatedInput)
            }
        }, 800)
        return () => {
            clearInterval(fire)
            questionIndex.current = 17
        }
    }, [passwordInput])

    //Paul eating

    useEffect(() => {
        const consumeFood = setInterval(() => {
            if(questionIndex.current === 17 && passwordInput.includes('🐛')){
                let paulAte = passwordInput.replace('🐛', '')
                setPasswordInput(paulAte)
            }
        }, 20000)
        return () => clearInterval(consumeFood)
    }, [passwordInput])

    useEffect(() => {
        const timer = setInterval(() => {
            const currentQuestion = questions[currentQuestionIndex]
            if(currentQuestion.isTrue(passwordInput)){
                if(currentQuestionIndex < questions.length - 1){
                    let updatedTrueQs = [currentQuestion, ...trueQs]
                    setTrueQs(updatedTrueQs)
                    setCurrentQuestionIndex(currentQuestionIndex + 1)
                } else{
                    clearInterval(timer)
                }
            }
            
        }, 50)
        return () => clearInterval(timer)
    }, [currentQuestionIndex, passwordInput]
    )

    useEffect(() => {
        const falseFinder = setInterval(() => {
            for(let i = 0; i < trueQs.length; i++){
                const currentQuestion = trueQs[i]
                if(!currentQuestion.isTrue(passwordInput)){
                    let updatedTrueQs = trueQs.filter(function (questions){
                        if(questions.isTrue(passwordInput)){
                            return questions
                        }
                    })
                    setTrueQs(updatedTrueQs)
                    let updatedFalseQs = [currentQuestion, ...falseQs]
                    setFalseQs(updatedFalseQs)
                } else {
                    clearInterval(falseFinder)
                }
            }
        }, 50)
        return () => clearInterval(falseFinder)
    }, [currentQuestionIndex, passwordInput])

    return (
        <>
            {/* <LoadScript googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_KEY} libraries={['places']}>
                <Maps />
            </LoadScript> */}
            <h1>* The Password Game</h1>
            <div className='content-center justify-center'>
                <h3 className='text-3xl font-bold underline'>Please choose a password</h3>
                <div className='flex grid grid-cols-2 gap-4 items-center'>
                    <TextArea value={passwordInput} onChange={handleInputChange} />
                    <h3>{passwordInput.length}</h3>
                </div>
                <ul> 
                    {/* Rendered all at once BELOW ----------- */}
                    {/* {questions.map((q) =>{ 
                    if(!isQConditionMet(q)){
                        return (
                            <li key={q.id} className='flex border border-rounded content-center items-center'>
                                <Card question={q.text} />
                                {q.refresh && <button onClick={() => refreshCaptcha()}>Refresh</button>}
                            </li>
                        )
                    }
                    }
                    )} */}
                    {/* Rendered one at a time BELOW ----------- */}
                    {falseQs.map((q) => {
                        return (
                            <li key={q.id}>
                                <Card question={q.text} className='text-red-600' />
                            </li>
                        )
                    })}
                    {(currentQuestionIndex < questions.length) ? (
                        <li key={currentQuestionIndex}>
                            <Card question={questions[currentQuestionIndex].text} />
                            {questions[currentQuestionIndex].refresh && <button onClick={() => refreshCaptcha()}>Refresh</button>}
                        </li>
                    ) : (
                        <></>
                    )}
                    {trueQs.map((q) => {
                        return (
                            <li key={q.id}>
                                <Card question={q.text} />
                            </li>
                        )
                    })}
                </ul>
                {/* {answeredQs.map((q) => {
                        q.isTrue(passwordInput) ? (
                            <li key={q.id}>
                                <Card question={q.text} />
                            </li>
                        ) : (
                            <li key={q.id}>
                                <Card question={q.text} style={{color: 'red'}}/>
                            </li>
                        )
                })} */}
            </div>
        </>
    )
}