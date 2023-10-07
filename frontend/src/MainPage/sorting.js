export function SortingAsc(items){
    let products = items.sort((a,b) => {
        if (a.price < b.price){
          return 1
        }else if(a.price > b.price){
          return -1
        }else{
          return 0
        }
    })

    return products
}

export function SortingDesc(items){
    let products = items.sort((a,b) => {
        if (a.price < b.price){
          return -1
        }else if(a.price > b.price){
          return 1
        }else{
          return 0
        }
    })
    return products
}