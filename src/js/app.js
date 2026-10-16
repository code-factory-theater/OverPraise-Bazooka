let isMuted = false;
        let lastPraiseText = '';

        // 謙遜ワード検知
        const humbleWords = ['普通', 'しょせん', 'だけ', 'たいしたこと', 'みんな', 'できて当然', '誰でも', 'しょっぱい', 'しょぼい', '微妙', 'つまらない', 'つまり', '別に', 'なんでもない', 'どうでも'];

        function setAchievement(text) {
            document.getElementById('achievement').value = text;
            document.getElementById('achievement').focus();
        }

        function toggleMute() {
            isMuted = !isMuted;
            const btn = document.getElementById('muteBtn');
            btn.textContent = isMuted ? '🔇 音OFF' : '🔊 音ON';
            btn.classList.toggle('muted', isMuted);
        }

        function checkHumbleWords(text) {
            return humbleWords.some(word => text.includes(word));
        }

        function generatePraise() {
            const achievement = document.getElementById('achievement').value.trim();
            const errorMsg = document.getElementById('errorMessage');

            if (!achievement) {
                errorMsg.classList.add('show');
                setTimeout(() => errorMsg.classList.remove('show'), 3000);
                return;
            }

            // 謙遜検知
            if (checkHumbleWords(achievement)) {
                showWarning();
                return;
            }

            const mode = document.querySelector('input[name="mode"]:checked').value;
            const praiseText = generatePraiseText(achievement, mode);
            lastPraiseText = praiseText;

            // 結果表示
            const resultContainer = document.getElementById('resultContainer');
            const resultText = document.getElementById('resultText');
            resultText.textContent = praiseText;
            resultContainer.classList.add('show');

            // 効果音
            if (!isMuted) {
                playSound();
            }

            // 紙吹雪とパーティクル
            createConfetti();
            createRainbow();
        }

        function generatePraiseText(achievement, mode) {
            const templates = {
                hotblood: [
                    `お前…すげぇよ！『${achievement}』…よくその一歩を踏み出したな！その勇気、その決断、その実行力！俺は感動した！`,
                    `何だこの気迫は…！『${achievement}』と聞いて、俺の心臓が止まるかと思った！貴様は真の戦士だ！`,
                    `信じられない…！これが人間の本当の力か…！『${achievement}』…こんなこと、普通できねぇぞ！貴様は伝説だ！`
                ],
                warlord: [
                    `天晴れじゃ！『${achievement}』とは、まさに国士無双！敵陣を切り抜ける如き、その身軽さと機動力！本日、貴殿を我が陣営の最高司令官として認定する！`,
                    `呉越同舟！かの古き戦国の世においても見られざる、『${achievement}』の一手！城を守り、国を守り、民を守る…その覚悟の表れよ！`,
                    `武士の本懐ここにあり！『${achievement}』…この偉業に対し、天下泰平の恩寵を与えん！`
                ],
                okan: [
                    `えらい！天才！うちの子はこんなことできるんや！『${achievement}』なんて、ノーベル賞確定よ！もうお母さんは誇りで一杯や…`,
                    `『${achievement}』？もう、あんたは何てことをしてくれるんや！嬉しくて涙が出そう…ノーベル賞の推薦状、今から書いとくからね…`,
                    `あんたは天才や…本当の天才や…『${achievement}』なんて、この世に何人ができるんやろう…お母さんの誇りや…`
                ],
                foreign: [
                    `オーマイガー、ボブ！彼が何をしたか見たかい！？『${achievement}』だ！靴下を履いたんだ！アメージング！ファンタスティック！フェノメナル！`,
                    `待ってくれ…これはもう…『${achievement}』…どうやったんだ…！信じられん！ジーザス！`,
                    `ホーリー・シモン！『${achievement}』とは…！世界中の科学者が研究すべき人物だ！エクセレント！パーフェクト！`
                ]
            };

            const modeTemplates = templates[mode];
            return modeTemplates[Math.floor(Math.random() * modeTemplates.length)];
        }

        function createConfetti() {
            const symbols = ['🎉', '🎊', '✨', '⭐', '🌟', '💫', '🎈', '🎁', '🏆', '👑', '🔥', '💯'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti confetti-falling';
                    confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.top = '-50px';
                    confetti.style.color = ['#FF6B6B', '#FFD700', '#667eea', '#764ba2', '#00ff00'][Math.floor(Math.random() * 5)];
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => confetti.remove(), 3000);
                }, i * 50);
            }
        }

        function createRainbow() {
            const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
            
            for (let i = 0; i < 100; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.width = Math.random() * 20 + 5 + 'px';
                particle.style.height = particle.style.width;
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9998';
                particle.style.opacity = Math.random() * 0.5 + 0.5;
                document.body.appendChild(particle);
                
                const xMove = (Math.random() - 0.5) * 200;
                const yMove = (Math.random() - 0.5) * 200 - 100;
                
                particle.animate([
                    { transform: 'translate(0, 0)', opacity: particle.style.opacity },
                    { transform: `translate(${xMove}px, ${yMove}px)`, opacity: 0 }
                ], {
                    duration: 2000,
                    easing: 'ease-out'
                });
                
                setTimeout(() => particle.remove(), 2000);
            }
        }

        function playSound() {
            // Web Audio APIでサウンド生成
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;

            // クラッカー音的な効果音
            const osc1 = audioContext.createOscillator();
            const gain1 = audioContext.createGain();
            osc1.connect(gain1);
            gain1.connect(audioContext.destination);
            
            osc1.frequency.setValueAtTime(800, now);
            osc1.frequency.exponentialRampToValueAtTime(100, now + 0.1);
            gain1.gain.setValueAtTime(0.3, now);
            gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            
            osc1.start(now);
            osc1.stop(now + 0.1);

            // 歓声的な音
            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                
                osc2.frequency.setValueAtTime(400, now + 0.15);
                osc2.frequency.exponentialRampToValueAtTime(600, now + 0.35);
                gain2.gain.setValueAtTime(0.2, now + 0.15);
                gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                
                osc2.start(now + 0.15);
                osc2.stop(now + 0.35);
            }, 100);
        }

        function showWarning() {
            const overlay = document.getElementById('warningOverlay');
            overlay.style.display = 'flex';
            
            if (!isMuted) {
                playWarningSound();
            }

            setTimeout(() => {
                overlay.style.display = 'none';
            }, 5000);
        }

        function playWarningSound() {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;
            
            for (let i = 0; i < 3; i++) {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                
                osc.frequency.setValueAtTime(200, now + i * 0.15);
                gain.gain.setValueAtTime(0.3, now + i * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.1);
                
                osc.start(now + i * 0.15);
                osc.stop(now + i * 0.15 + 0.1);
            }
        }

        function shareToX() {
            const text = encodeURIComponent(`🎉 ほめ殺しバズーカで褒められました！\n\n"${lastPraiseText}"\n\n#ほめ殺しバズーカ #自己肯定感`);
            window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
        }

        // Enterキーで送信
        document.getElementById('achievement').addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                generatePraise();
            }
        });