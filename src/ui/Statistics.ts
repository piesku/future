import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {income, mult_current} from "../generator.js";

const percent = new Intl.NumberFormat("en", {style: "percent"});
const multiplier = new Intl.NumberFormat("en", {maximumFractionDigits: 2});

export function Statistics(game: Game) {
    let total_income = 0;
    for (let own of game.Generators) {
        let gen = GENERATORS[own.Id];
        if (gen.Kind === "auto") {
            total_income += income(gen, own.Count);
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
                            <li>Seconds per second: ${total_income.toFixed(0)}</li>
                        </ul>
                    </li>
                    ${game.Generators.map((own) => {
                        if (own.Count > 0) {
                            let gen = GENERATORS[own.Id];
                            let current_income = income(gen, own.Count);
                            let share = total_income > 0 ? current_income / total_income : 0;

                            return html`
                                <li>
                                    ${gen.Name}
                                    <ul>
                                        <li>Count: ${own.Count}</li>
                                        ${gen.Kind === "auto"
                                            ? `<li>Time per second: ${human_time_short(
                                                  current_income
                                              )}</li>
                                                <li>Share of Total: ${percent.format(share)}</li>
                                            `
                                            : `<li>Time per click: ${human_time_short(
                                                  current_income
                                              )}</li>
                                            `}
                                        <li>
                                            Multiplier:
                                            ${multiplier.format(mult_current(gen, own.Count))}x
                                        </li>
                                        <!-- <li>Income +1: ${human_time_short(
                                            income(gen, own.Count + 1)
                                        )}</li>
                                            <li>Income +10: ${human_time_short(
                                            income(gen, own.Count + 10)
                                        )}</li> -->
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
