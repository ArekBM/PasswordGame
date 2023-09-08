export default function Input(props: React.ComponentPropsWithoutRef<'input'>){
    return (
        <input {...props}
        className='block w-full rounded border border-gray-800 px-4 py-2 dark: text-gray-800'
        type='text'
        ></input>
    )
}