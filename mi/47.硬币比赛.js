/**
 * 描述:有 n 个不同价值的硬币排成一条线。有 A 与 B 两个玩家，指定由 A 开始轮流（A 先手，然后 B，然后再 A..）从左边依次拿走 1 或 2 个硬币（不能不拿，也不能拿其他个数），直到没有硬币为止。最后计算 A 与 B 分别拿到的硬币总价值，价值高的人获胜。
请依据硬币的排列情况来判定，先手的玩家 A 能否找到必胜策略？
 * 输入:使用逗号(,)分隔的一个正整数数组，表示这排硬币的排列情况与对应价值
 * 输出:true 或 false（字符类型），表示玩家 A 能否找到必胜策略
 */

function deal(line) {
	const coins = line.split(',').map(d => +d);
    const count = coins.length;
    const dp = [];
    // 如果我是明智的，那么我从第一个硬币就能看出我的胜负
    // 为了明智，我必须得从后往前，依次把所需情况存储在dp中
    // 然后再根据dp[0]来判断我是否能胜利
    for(let i = count - 1; i >= 0; i--) {
    	if(i >= count - 1) {
        	dp[i] = coins[i];
        } else if(i >= count - 3) {
        	dp[i] = coins[i] + coins[i+1];
        } else if(i >= count - 4) {
            // 此时，正好有4个，如果我拿1个，对手如果不是sb，肯定会拿2个，所以是+dp[i+3]
            // 如果我拿2个，对手如果不是sb，肯定会拿2个，所以+0
        	dp[i] = Math.max(
            	coins[i] + dp[i+3],
                coins[i] + coins[i+1] + 0
            )
        } else {
        	dp[i] = Math.max(
                // 如果拿一个，那么面对第i个硬币时能获取的最大价值时第i个硬币的价值，加上隔一轮后的下一个状态时能获取的最大价值
                // 而隔一轮后下一个状态有两种，要么拿一个，要么拿两个，而在这一轮之前，对手可能拿一个，也可能拿两个，所以是i+2和i+3
                // 那么我的这一轮的最大值应该是什么呢？
                // 肯定是min(dp[i+2], dp[i+3])，因为这个状态是由对手决定，由给赋予给你的，如果他是明智的，他肯定会用min
                // 相反，如果用max，那么你的对手就是傻逼了，最后的结果也肯定不对
            	coins[i] + Math.min(dp[i+2], dp[i+3]),
                coins[i] + coins[i+1] + Math.min(dp[i+3], dp[i+4])
            )
        }
    }
    // 有了dp[0]了，现在判断是否胜利
    const sum = coins.reduce((item, next) => item+next, 0);
    // console.log(dp,  sum)
    return dp[0] * 2 > sum;
}