import { BounceLoader } from 'react-spinners'

function Loading() {
    return (
        <div className='flex w-full h-[80vh] justify-center items-center'>
            <BounceLoader color='#2cb1ec' />
        </div>
    )
}

export default Loading