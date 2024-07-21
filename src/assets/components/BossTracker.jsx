import React, { useState, useEffect } from "react";
import "./BossTracker.css";
import GyoubuOniwa from "../assets/images/gyoubu_oniwa.jpg";
import LadyButterfly from "../assets/images/lady_butterfly.jpg";
import GenichiroAshina from "../assets/images/genichiro_ashina.jpg";
import FoldingScreenMonkeys from "../assets/images/folding_screen_monkeys.jpg";
import GuardianApe from "../assets/images/guardian_ape.jpg";
import HeadlessApe from "../assets/images/headless_ape.jpg";
import CorruptedMonk from "../assets/images/corrupted_monk.jpg";
import IsshinAshina from "../assets/images/isshin_ashina.jpg";
import GreatShinobiOwl from "../assets/images/great_shinobi_owl.jpg";
import TrueCorruptedMonk from "../assets/images/true_corrupted_monk.jpg";
import DivineDragon from "../assets/images/divine_dragon.jpg";
import OwlFather from "../assets/images/owl_father.jpg";
import DemonOfHatred from "../assets/images/demon_of_hatred.jpg";
import IsshinTheSwordSaint from "../assets/images/isshin_the_sword_saint.jpg";

const bosses = [
  { name: "Gyoubu Oniwa", image: GyoubuOniwa, emoji: "⚔️" }, // First boss
  { name: "Lady Butterfly", image: LadyButterfly, emoji: "🦋" }, // Teach you the true path of Sekiro
  { name: "Genichiro Ashina", image: GenichiroAshina, emoji: "🗡️" }, // Unlock the Mikiri Counter skill
  { name: "Folding Screen Monkeys", image: FoldingScreenMonkeys, emoji: "🐒" }, // Each monkey has a different gimmick
  { name: "Guardian Ape", image: GuardianApe, emoji: "🦧" }, // Two phases, devastating gas attack
  { name: "Headless Ape", image: HeadlessApe, emoji: "🐵" }, // Continuation of the Guardian Ape fight
  { name: "Corrupted Monk", image: CorruptedMonk, emoji: "🧘" }, // Test of pattern memorization skills
  { name: "Isshin Ashina", image: IsshinAshina, emoji: "🔥" }, // Bait out attacks, second phase sets arena on fire
  { name: "Great Shinobi Owl", image: GreatShinobiOwl, emoji: "🦉" }, // Deflection and dodge shurikens
  { name: "True Corrupted Monk", image: TrueCorruptedMonk, emoji: "🧘" }, // Revisit of the Corrupted Monk fight
  { name: "Divine Dragon", image: DivineDragon, emoji: "🐉" }, // Two phases, fight elderly dragons and then Divine Dragon
  { name: "Owl (Father)", image: OwlFather, emoji: "🦉" }, // Tough fight, use Mortal Draw skill
  { name: "Demon of Hatred", image: DemonOfHatred, emoji: "😈" }, // Long fight, many unblockable attacks
  { name: "Isshin, The Sword Saint", image: IsshinTheSwordSaint, emoji: "⚔️" } // Final boss, tough fight
];

const BossTracker = () => {
  const [deathCounts, setDeathCounts] = useState({});

  useEffect(() => {
    const storedCounts = JSON.parse(localStorage.getItem("deathCounts")) || {};
    setDeathCounts(storedCounts);
  }, []);

  useEffect(() => {
    localStorage.setItem("deathCounts", JSON.stringify(deathCounts));
  }, [deathCounts]);

  const adjustCount = (boss, amount) => {
    setDeathCounts((prevCounts) => ({
      ...prevCounts,
      [boss]: (prevCounts[boss] || 0) + amount,
    }));
  };

  const resetCount = (boss) => {
    setDeathCounts((prevCounts) => ({
      ...prevCounts,
      [boss]: 0,
    }));
  };

  const totalDeaths = Object.values(deathCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  return (
    <div className="container">
      <h1 className="title">Sekiro Boss Tracker</h1>
      <ul className="boss-list">
        {bosses.map((boss) => (
          <li key={boss.name} className="boss-item">
            <span className="boss-name">
              <img src={boss.image} alt={boss.name} className="boss-image" />
              {boss.name} {boss.emoji}
            </span>
            <div className="button-group">
              <button
                className="button"
                onClick={() => adjustCount(boss.name, -1)}
                disabled={deathCounts[boss.name] === 0}
              >
                -
              </button>
              <input
                className="count-input"
                type="number"
                value={deathCounts[boss.name] || 0}
                onChange={(e) => adjustCount(boss.name, parseInt(e.target.value, 10) - (deathCounts[boss.name] || 0))}
              />
              <button
                className="button"
                onClick={() => adjustCount(boss.name, 1)}
              >
                +
              </button>
            </div>
            <button className="reset-button" onClick={() => resetCount(boss.name)}>Reset</button>
          </li>
        ))}
      </ul>
      <div className="total-deaths">TOTAL DEATHS: {totalDeaths}</div>
    </div>
  );
};

export default BossTracker;
