export function keydownHandler(evt: KeyboardEvent): void{
    switch (evt.code){
        case "KeyQ":
        case "KeyW":
        case "KeyE":
        case "KeyA":
        case "KeyS":
        case "KeyD":
            console.log(evt.code);
            break;
        default:
            break;
    }
};
