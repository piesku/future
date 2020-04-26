import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {ERAS, GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {income, mult_current} from "../generator.js";

const percent = new Intl.NumberFormat("en", {style: "percent"});
const multiplier = new Intl.NumberFormat("en", {maximumFractionDigits: 2});

export function Statistics(game: Game) {
    let era = ERAS[game.EraCurrent];

    return html`
        <div class="window" style="margin: 16px; width: 250px">
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
                            <li>Time per second: ${human_time_short(game.TpsCurrent)}</li>
                            <li>Seconds per second: ${game.TpsCurrent.toFixed(0)}</li>
                            <li>Era Multiplier : ${multiplier.format(era.Multiplier)}x</li>
                        </ul>
                    </li>
                    ${game.Generators.map((own) => {
                        if (own.count > 0) {
                            let gen = GENERATORS[own.id];
                            let current_income = income(era, gen, own.count);
                            let share = game.TpsCurrent > 0 ? current_income / game.TpsCurrent : 0;

                            return html`
                                <li>
                                    ${gen.Name}
                                    <ul>
                                        <li>Count: ${own.count}</li>
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
                                            ${multiplier.format(mult_current(gen, own.count))}x
                                        </li>
                                        <!-- <li>Income +1: ${human_time_short(
                                            income(era, gen, own.count + 1)
                                        )}</li>
                                            <li>Income +10: ${human_time_short(
                                            income(era, gen, own.count + 10)
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
