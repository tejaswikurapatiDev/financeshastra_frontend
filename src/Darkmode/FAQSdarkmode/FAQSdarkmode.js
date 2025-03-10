import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import './FAQSdarkmode.css'
import FooterForAllPagedarkmode from '../FooterForAllPagedarkmode/FooterForAllPagedarkmode';
import Navbardarkmode from '../Navbardarkmode/Navbardarkmode';

const FAQSdarkmode = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaqAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: ' What are the assets available for a retail investor?',
      answer:
        'Typically for corpus of less than 5 Crore, Equities, Debt and Gold are three broad asset classes suitable for investments. Your self-occupied house is not counted as an investment since it does not earn any returns. When your assets increase beyond 5 crore, you can consider Real Estate that you can rent and or sell to earn a return, as an additional asset to diversify your wealth.',
    },
    {
      question: 'I invest only in Fixed /Recurring Deposit; how do I know that the FinanceShastra Way of investing is right for me?',
      answer:
        'If you are investing in Fixed /Recurring Deposit for about 5 years and more, then this is a reasonably good duration to invest in Equity. Investing in Equity will help you to beat inflation and grow your corpus for meeting your long term goals. FinanceShastra will help you build your portfolio with quality assets, diversify it and occasionally rotate assets based on upside and downside risk.',
    },
    {
      question:
        'What is the FinanceShastra Way of Investing?',
      answer:
        'The FinanceShastra Way of Investing is to designed to ensure an investor reaches his financial goals by staying invested for long and earning a healthy risk-adjusted return.',
    },
    {
      question: 'How is this done?',
      answer:
        'We are anchored in estimating as best as possible the long term fair value of stocks based on fundamentals and using this knowledge intelligently to get in or move out of equity. This ensures an investor captures reasonable upside as well as protects downside; overall ensuring he doesn’t get out of equity at wrong times. In the end what matters is time spent in the market to compound the capital rather than chasing returns.',
    },
    {
        question: 'How does FinanceShastra know when the market is over or under-valued?',
        answer:
          'We have developed a unique measure Nifty@MRP and Sensex@MRP, which is a hypothetical value of the Nifty/Sensex if all the 50/30 stocks were fairly valued. We have analysed the actual movement of the market vis-à-vis Nifty@MRP and Sensex@MRP for more than 5 years (real time) and back-tested our hypothesis over more than a decade. This has enabled us to confidently assess whether the market is over-valued or under-valued at any point of time.',
      },
      {
        question: 'Which products does FinanceShastra advise to invest in?',
        answer: [
          'Based on opportunity we would recommend investing in:',
          '1. Liquid Fund',
          '2. Index Fund',
          '3. Select Quality Stocks',
          '4. Equity Mutual Funds',
          '5. Gold ETF',
        ],
      },
      
      {
        question: '. What is a Liquid Fund?',
        answer:
          'Liquid Fund is a category of mutual fund which primarily invests our funds in money market instruments like certificate of deposits, treasury bills, commercial papers and term deposits. Since all the above instruments are very liquid and short term assets, Liquid fund can be redeemed easily. It typically earn close to after-tax Fixed Deposit returns but more tax efficient if held for more than 3 years. Besides, it can redeemed without any penalty/pre-mature closure fee.',
      },
      {
        question: 'What is an Index Fund?',
        answer:
          'An index fund is a type of mutual fund with a portfolio of 50-80 stocks constructed to match or track the market index, such as Nifty 50 or MSCI 80. An index mutual fund is said to provide broad market exposure, low operating expenses and low portfolio turnover. This product can be used for tactical allocation if not many stocks are available at decent prices, thereby holding a diversified equity. Two popular index funds are listed on exchange R*Shares Nifty BEES & Junior BEES.',
      },
      {
        question: 'Why not just put all the money in the Index Fund?',
        answer:
          'An Index construction is done based on free float market capitalization of companies, meaning larger companies would form higher proportion of the index irrespective of their valuation and quality. An Index may correct more in bad times due to poor quality companies or overvalued companies. Second, it may take more time to recover because it may continue to hold poor quality stocks that may not get removed as they would have high free float market capitalization. Besides, just buying and holding an index fund would lead to high volatility. In times of correction, it may scare an investor to move out of equity. Asset allocation between equity and debt would work better as it would reduce volatility in bad times.',
      },
      {
        question: ' I have a sizeable portfolio but I also save good money every month. How will FinanceShastra Plans work for me?',
        answer:
          'You can add Cash every month and Omega will advise to invest in best possible opportunity available at that particular time. This will ensure you invest in asset that would earn some absolute return rather than investing passively in any asset.',
      },
      {
        question: 'My current monthly savings are small compared to my portfolio. How should I manage this?',
        answer:
          'If your monthly savings are small compared to portfolio, you can use our lower cost solution SmartSIP and do an SIP in mutual funds till the corpus becomes significant and then add it to Omega Portfolio for better investment outcome.',
      },
      {
        question: 'What are risk-adjusted returns? Why FinanceShastra insists on the same?',
        answer:
          'Equity generate higher than FD returns due to higher underlying risk. Risk means the returns from equity returns could be low or high, or inadequate from time to time versus our expectations. If FD earns 7% pre-tax, equity returns must be much more than FD return to compensate for uncertainty of business/market cycles. Given India’s GDP Growth Rate + Inflation Rate is about 13% CAGR for past several years, this return looks plausible and is good compensation for risk too. A moderate risk can earn slightly better than 13% CAGR returns over long term.',
      },
      {
        question: 'Does timing the market work?',
        answer:
          'Context of Timing the market is very important. Timing the market only based on hunches, personal biases definitely will not work in long term. But if one takes cognizance of market valuations, i.e. he can reduce exposure if upside is low and increase exposure to equity when upside is high, it may lead to good outcome. Some experts argue timing may earn poor returns versus buy and hold in back-testing model, we believe staying invested is more important than earning the last paisa from equity. Fall in portfolio value from peak can scare investor out of equities and lead to unproductive behaviour of selling out at the bottom. It is always better to minimize regret rather than maximize profits.',
      },
      {
        question: ' I have a significantly large amount saved. Is there a right time to shift it to the FinanceShastra Way of Investing?',
        answer:
          'Yes. FinanceShastra uses market valuation to consider how much of the corpus must be invested in equities at any given point. If market valuations are low, upside will be more hence higher % of corpus will be invested in equity. Even if market falls further temporarily, you can be certain that your portfolio will earn good absolute returns in long term. If market valuations are high, upside will be low hence lower % of corpus will be invested in equity. Even if market rises temporarily, it will be eventually earning lower returns in long term as starting valuations were high.',
      },
      {
        question: 'How is the FinanceShastra Way of Investing better than doing an SIP in Equity Mutual Funds?',
        answer:
          'SIP in a mutual fund means one doesnot consider valuations but keeps investing regularly. This provides benefit of time correction but not necessarily price correction. Firstly, success of SIP is dependent on buying when markets are cheap or fair or expensive, so the purchase price will be averaged.But the problem is market valuations remain expensive more often than they are cheap or fair. This leads to poor SIP returns. Secondly, if market valuations are fair to cheap and an investor has Lumpsum available, it better to put funds at once. Market goes up in value in 4 out of 5 years. Going for SIP route means missing the rally and also losing time value of money. FinanceShastra recommends investing large portion of corpus in equities if they are fairly valued or cheap. This ensures one earns good absolute returns. Similarly, FinanceShastra way recommends selling equity or holding smaller allocation to equities when markets are expensive.This process of buying low and selling high leads to better returns over long term.',
      },
      {
        question: 'What if I need money suddenly?',
        answer:
          'While we ask you to invest for the long term, ie: money you wonot need for the next 5+ years at least, it can happen that you do need to touch this money. Had you invested in Fixed /Recurring Deposit you would have to break it and would lose some money (interest loss),while doing it. With the FinanceShastra Way of Investing you can meet this emergency in various ways depending on the market situation. You are likely to hold some money in a Liquid Funds and selling this becomes the obvious way to meet the emergency. When you do this your portfolio will ask you to rebalance it by selling that portion of your equity holding that makes the most sense to sell at that time. You can override this if you expect to put some money back into the plan soon. This may make sense if the market is under-valued and you wish to hold on to your equity portfolio. If the markets are in the over-valued zone you may be comfortable acting on the rebalancing advice. Thus you will have some good flexibility on how you manage such emergencies.',
      },
      {
        question: ' What is a Mutual Fund?',
        answer:
          'A mutual fund is a pool of funds collected from multiple investors for the purpose of investing in stocks, bonds. Every mutual fund has a fund manager who takes active decision in picking stocks. Mutual Fund charges a fee varying from 1.5 to 2.5% of assets under management typically, with a promise of trying to beat the market. In addition if you buy through a MF distributor (Regular plan) you end up paying 1% towards distribution cost. When you buy a directly (Direct plan) you save the 1% distribution cost. However, you do not get any advice (good or bad) from your distributor/agent when you buy directly.',
      },
      {
        question: 'How does FinanceShastra select the Mutual Fund that it recommends?',
        answer:
          'Our analysts actively track underlying assets a mutual fund holds rather than popular past performance analysis. We analyse a fund manager’s past process of stock picking and determine strategy across market cycles ,while on an aggregate basis mutual funds would yield market returns only, occasionally some mutual fund might be holding a large percentage in undervalued stocks with a potential to earn very high returns for next 2-3 years. We endeavour to recommend only such Mutual Fund',
      },
      {
        question: 'How is the FinanceShastra Way of Investing different from a Mutual Fund-Robo Advisory?',
        answer:
          'MF-Robo typically recommends Mutual Funds based on Past Performance analysis; the most popular way to short list a mutual fund for investment. Rather than analysing past performance which is an outcome, we analyse the underlying assets a mutual fund holds. We are then able to assess the health of the portfolio as well as the potential upsides based on our proprietary methods. We also keep a tab on the quality of churn. In addition we also recommend investment in quality stocks at attractive discounts from their MRPs and lower cost Index Funds. This provides a better portfolio design than only investing in Mutual Funds.',
      },
      {
        question: 'How do you lower the risk involved in Direct Equity Investing?',
        answer:
          'We consider the primary risk in equity is making a permanent loss of capital. Following are three levels of how we reduce risk: 1. First, we select only best quality stocks after running the stock through our 10Year X-Ray. 2. Second, we buy the stock at 20-50% discount to its MRP which reduces our downside risk or deviation in future estimates, if any. 3. Third, we recommend diversifying portfolio in 15-18 stocks. This reduces business specific risks and eliminates risks to a large extent.',
      },
      {
        question: 'How does FinanceShastra arrive at the MRP of a stock?',
        answer:
          'At FinanceShastra equity analysts analyse the company, its current and likely future profitability based on the business and economic cycles over the next 5 years and using the appropriate valuation method arrive at the fair value a company. This we call its MRP.',
      },
      {
        question: 'How is FinanceShastra MRP different from the Target Price given by Broking Houses?',
        answer:
          'FinanceShastra MRP is a fair value estimate of a stock. Fair value depends upon long term profitability of a company. In the long term a company would trade at its fair value. If we buy a stock at price lower than fair price, we get a bargain. This increases our chances of making a profit. Brokerage Target price is basically based on short term company performance and likely stock price movement in 6 to 12 months. This may or may not depend on company performance but has more to do with stock market sentiment',
      },
      {
        question: 'How does the systematic tranche-wise investment in a stock work?',
        answer:
          'On most occasions, great stocks may not trade at large discount to their MRP for obvious reasons. Sometimes they are available at attractive prices but still a little higher than our preferred buy price which could range from a small discount from the MRP for the best stocks to DP for other. We therefore think of a band around our preferred buy price. We recommend starting buying them as soon as they enter the buying band. If the price goes lower we buy more of it in instalments till we have purchased the desired quantity or maximum allocation.',
      },
  ];

  return (

    <div className="faqquestans-containerdarkmode">
      <h2 className="faq-titledarkmode">Frequently Asked Questions</h2>
      <div className="faq-listdarkmode">
      
        {faqs.map((faq, index) => (
          <div key={index} className="faq-itemdarkmode">
            <button
              className="faq-questiondarkmode"
              onClick={() => toggleFaqAnswer(index)}
            >
              {index + 1}. {faq.question}
              <span className="faq-icondarkmode">
                {openIndex === index ? <FaAngleUp  className='upfaq'/> : <FaAngleDown  className='downfaq'/>}
              </span>
            </button>
           
            {openIndex === index && (
              <p className="faq-answerdarkmode">{faq.answer}</p>
            )}
          
          </div>
        ))}

      </div>
      <Navbardarkmode/>
    <div className="foooterpagesattt">
    <FooterForAllPagedarkmode/>
  </div>
    </div>
   
  
  );
};

export default FAQSdarkmode;