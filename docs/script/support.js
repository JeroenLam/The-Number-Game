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

function changeDivVal(elementId, min, max, amount)
{
    const element = document.getElementById(elementId);
    val = parseInt(element.textContent);
    newVal = val + amount;
    if (newVal <= max)
        if (newVal >= min)
            val = newVal;
    element.innerHTML = val;
}

function min(val1, val2)
{
    if (val1 < val2)
        return val1;
    return val2;
}

function max(val1, val2)
{
    if (val1 > val2)
        return val1;
    return val2;
}