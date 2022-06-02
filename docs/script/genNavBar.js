// Array containing [navText, href, imgUrl]
const navBarItems = [
    ["The Number Game", "/"],
    ["Epistemic logic", "/Epistemic"],
    ["Generalisability", "/Generalisability"],
    ["RNG bound", "/RNGbound"],
    ["Demo", "/WebDemo"],
    ["Github", "https://github.com/JeroenLam/The-Number-Game", "/images/GitHub-Mark-32px.png"],
];

function genNavBar(navBarDivId)
{
    // Retreive element
    const element = document.getElementById(navBarDivId);

    // Construct all navbar items
    for (let idx = 0; idx < navBarItems.length; ++idx)
    {
        item = navBarItems[idx];
        text = "";

        // Make only the first item active
        if (idx == 0)
            text += "<a class='active' href='" + item[1] + "'>";
        else
            text += "<a href='" + item[1] + "'>";

        // If the item contains an image, add the image
        if (item.length == 3)
            text += "<img src='" + item[2] + "' alt='" + item[0] + "'>";

        // Add the text
        text += item[0] + "</a>";

        // Add element to the nav bar
        element.innerHTML += text;
    }
}