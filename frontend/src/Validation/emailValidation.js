function RegexEmail(email){
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) == true){
        return true
    }else
        return false
}

export default RegexEmail