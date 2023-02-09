import { ref } from "vue";

export function getsonger(){
    const total = ref({
        语种: [
          { area: "-1", name: "全部" },
          { area: "7", name: "华语" },
          { area: "96", name: "欧美" },
          { area: "8", name: "日本" },
          { area: "16", name: "韩国" },
          { area: "0", name: "其他" },
        ],
        分类: [
          { type: "-1", name: "全部" },
          { type: "1", name: "男歌手" },
          { type: "2", name: "女歌手" },
          { type: "3", name: "乐队" },
        ],
        筛选: [
          { initial: "-1", name: "热门" },
          { initial: "a", name: "A" },
          { initial: "b", name: "B" },
          { initial: "c", name: "C" },
          { initial: "d", name: "D" },
          { initial: "e", name: "E" },
          { initial: "f", name: "F" },
          { initial: "g", name: "G" },
          { initial: "h", name: "H" },
          { initial: "i", name: "I" },
          { initial: "j", name: "J" },
          { initial: "k", name: "K" },
          { initial: "l", name: "L" },
          { initial: "m", name: "M" },
          { initial: "n", name: "N" },
          { initial: "o", name: "O" },
          { initial: "p", name: "P" },
          { initial: "q", name: "Q" },
          { initial: "r", name: "R" },
          { initial: "s", name: "S" },
          { initial: "t", name: "T" },
          { initial: "u", name: "U" },
          { initial: "v", name: "V" },
          { initial: "w", name: "W" },
          { initial: "x", name: "X" },
          { initial: "y", name: "Y" },
          { initial: "z", name: "Z" },
          { initial: "0", name: "#" },
        ],
      });

      return total
}