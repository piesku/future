import {html} from "../../common/html.js";
import {decimal_f, integer_f, percent_f} from "../../common/number.js";
import {human_time_short} from "../../common/time.js";
import {ERAS, GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {income, mult_current} from "../generator.js";
import {Window} from "./Window.js";

export function Statistics(game: Game) {
    let era = ERAS[game.EraCurrent];
    return Window(
        game,
        "Income Statistics",
        html`
            <ul class="tree-view" style="overflow-y: scroll; overflow-wrap: anywhere;">
                <li>
                    Total
                    <ul>
                        <li>Time per second: ${human_time_short(game.TpsCurrent)}</li>
                        <li>Seconds per second: ${integer_f.format(game.TpsCurrent)}</li>
                        <li>Era Multiplier : ${decimal_f.format(era.Multiplier)}x</li>
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
                                                <li>Share of Total: ${percent_f.format(share)}</li>
                                            `
                                        : `<li>Time per click: ${human_time_short(
                                              current_income
                                          )}</li>
                                            `}
                                    <li>
                                        Bonus multiplier:
                                        ${decimal_f.format(mult_current(gen, own.count))}x
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
        `
    );
}
