export function availabilityLabel(obtainable: boolean | null) {
    if (obtainable === true) return "Conseguible";
    if (obtainable === false) return "No conseguible";
    return "Sin revisar";
}
