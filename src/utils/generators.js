export const generateStreamUserId=()=>{
    const numbers = '0123456789'
    let userId = ''
    for (let i=0;i<6;i++){
        console.log(Math.ceil(Math.random(8) * 10));
        userId += numbers[Math.floor(Math.random(9) * numbers.length)]
    }
    return userId
}


