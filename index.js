const {
    Connection,
    PublicKey,
    clustterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    clusterApiUrl
}= require('@solana/web3.js')


//used to create new wallet
const wallet = new Keypair()


//creating publickey and privatekey for solana
const publicKey=new PublicKey(wallet._keypair.publicKey)
const secretKey=wallet._keypair.secretKey

// console.log(publicKey)
// console.log(secretKey)


//getting balance of our wallet
const getWalletBalance = async() => {
    try {
        
        //using connection in devnet to check balance
        const connection =new Connection(clusterApiUrl('devnet'),'confirmed')
        //connecting the publickey and the devnet
        const walletBalance=await connection.getBalance(publicKey)
        console.log(`Wallet balance is ${walletBalance}`)
        
    } catch (err) {

        console.error(err)
        
    }
}
//sending Sol to that wallet
const airDropSol=async()=>{
    try {
        const connection =new Connection(clusterApiUrl('devnet'),'confirmed')
        const fromAirDropSignature=await connection.requestAirdrop(publicKey,2*LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirDropSignature)
    } catch (err) {
        console.log(err)
    }
}


//checking balance here.
const main = async()=>{
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}
main()
