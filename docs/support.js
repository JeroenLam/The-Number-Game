function incrementDiv(elementId,max)
{
    const element = document.getElementById(elementId);
    val = parseInt(element.textContent);
    if (val < max)
        ++val;
    element.innerHTML = val;
}

function decrementDiv(elementId, min)
{
    const element = document.getElementById(elementId);
    val = parseInt(element.textContent);
    if (val > min)
        --val;
    element.innerHTML = val;
}