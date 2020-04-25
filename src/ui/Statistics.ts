import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {Game} from "../game.js";
import {income, mult_current} from "../generator.js";

const percent = new Intl.NumberFormat("en", {style: "percent"});

export function Statistics(game: Game, total_income: number) {
    let buy_count = game.InputState["Shift"] ? 10 : 1;

    return html`
        <div class="window" style="margin: 32px; width: 250px">
            <div class="title-bar">
                <div class="title-bar-text">
                    Income Statistics
                </div>
            </div>
            <div class="window-body">
                <ul class="tree-view" style="overflow-y: scroll;">
                    ${game.Generators.map((gen, idx) => {
                        if (gen.Count > 0) {
                            let current_income = income(gen.Config, gen.Count);
                            let next_income = income(gen.Config, gen.Count + buy_count);
                            let share = total_income > 0 ? current_income / total_income : 0;

                            return html`
                                <li>
                                    ${gen.Config.Kind.toUpperCase()}${idx}
                                    <ul>
                                        <li>Count: ${gen.Count}</li>
                                        <li>Income: ${human_time_short(current_income)}</li>
                                        ${gen.Config.Kind === "auto" &&
                                        `
                                        <li>Share of Total: ${percent.format(share)}
                                    `}
                                        <li>Multiplier: ${mult_current(gen.Config, gen.Count)}x</li>
                                        <li>Next Income: ${human_time_short(next_income)}</li>
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
