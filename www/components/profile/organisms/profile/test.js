
const renderMesocicloTable = (arr) => {
    const aux = arr
    arr.forEach((elem, i) => {
        if (i >= 12 && i % 12 === 0) {
            aux.splice(i, 0, ",")

        }
    })

    const arrayOfStrings = aux.join("").split(",")
    const arrayOfArrays = arrayOfStrings.map(arr => arr.split(""))
    return arrayOfArrays
}

console.log(renderMesocicloTable([1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]))
