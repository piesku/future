import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {income, mult_current} from "../generator.js";

const percent = new Intl.NumberFormat("en", {style: "percent"});

export function Statistics(game: Game) {
    let total_income = 0;
    for (let gen of game.Generators) {
        let config = GENERATORS[gen.Config];
        if (config.Kind === "auto") {
            total_income += income(config, gen.Count);
        }
    }

    return html`
        <div class="window" style="margin: 32px; width: 250px">
            <div class="title-bar">
                <div class="title-bar-text">
                    Income Statistics
                </div>
            </div>
            <div class="window-body">
                <ul class="tree-view" style="overflow-y: scroll;">
                    <li>
                        Total
                        <ul>
                            <li>Time per second: ${human_time_short(total_income)}</li>
                        </ul>
                    </li>
                    ${game.Generators.map((gen, idx) => {
                        if (gen.Count > 0) {
                            let config = GENERATORS[gen.Config];
                            let current_income = income(config, gen.Count);
                            let next_income_1 = income(config, gen.Count + 1);
                            let next_income_10 = income(config, gen.Count + 10);
                            let share = total_income > 0 ? current_income / total_income : 0;

                            return html`
                                <li>
                                    ${config.Kind.toUpperCase()}${idx}
                                    <ul>
                                        <li>Count: ${gen.Count}</li>
                                        <li>
                                            Time per second: ${human_time_short(current_income)}
                                        </li>
                                        ${config.Kind === "auto" &&
                                        `
                                        <li>Share of Total: ${percent.format(share)}
                                    `}
                                        <li>Multiplier: ${mult_current(config, gen.Count)}x</li>
                                        <li>Income +1: ${human_time_short(next_income_1)}</li>
                                        <li>Income +10: ${human_time_short(next_income_10)}</li>
                                    </ul>
                                </li>
                            `;
                        } else {
                            return null;
                        }
                    })}
                </ul>
            </div>
        </div>
    `;
}
