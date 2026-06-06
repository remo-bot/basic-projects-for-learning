class ColorGlobalStore {

  #currentBg = $state("#24c8db");
  #colorsList = [
    "#ff3e00", // Svelte Orange
    "#24c8db", // Tauri Cyan
    "#747bff", // Vite Purple
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ec4899"  // Pink
  ]

  get currentBg() {
    return this.#currentBg;
  }

  setBg(newColor: string) {
    this.#currentBg = newColor;
  }

  setRandom(){
    const randomIndex = Math.floor(Math.random() * this.#colorsList.length);
    this.#currentBg = this.#colorsList[randomIndex];
  }

  addColor(newColor: string){
    if(!(this.#colorsList.includes(newColor)))
      this.#colorsList = [...this.#colorsList, newColor]
  }

  get colorsList(){
    return this.#colorsList;
  }

}

export const colorStore = new ColorGlobalStore();
