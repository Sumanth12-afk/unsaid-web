import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding sample posts...');

  // First, ensure we have an admin user
  const adminEmail = 'nallandhigalsumanth@gmail.com';
  const adminEmailHash = require('crypto').createHash('sha256').update(adminEmail.toLowerCase()).digest('hex');
  
  let adminUser = await prisma.user.findUnique({
    where: { email_hash: adminEmailHash },
  });

  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        email_hash: adminEmailHash,
        trust_score: 1.0,
        is_verified: true,
      },
    });
    console.log('✅ Created admin user');
  }

  // Sample posts data - Detailed and comprehensive
  const samplePosts = [
    {
      companySlug: 'tcs',
      primary_category: 'wlb',
      sub_category: 'night_calls',
      employment_status: 'past',
      team_function: 'Engineering',
      sentiment: 'negative',
      content: 'I worked at TCS for close to 3 years in their application development and maintenance division in Bangalore. The work-life balance was honestly one of the worst aspects of working there. My manager had this habit of calling at odd hours - typically around 10 PM or sometimes even later - asking for status updates on tasks that were not urgent at all. These updates could have easily been shared the next morning via email or in our daily standup calls. Weekend work was normalized to the point where it became an unspoken expectation. During project deadlines, which seemed to happen every other month, we were expected to work both Saturday and Sunday without any questions. The worst part was that there was absolutely no compensation for this overtime work - no extra pay, no compensatory offs, nothing. When I raised this concern with my manager, I was told that this is just how things work in service-based companies and that I should be grateful to have a job. Several of my colleagues ended up burning out and leaving within the first two years. The constant pressure and lack of respect for personal time really took a toll on mental health. Looking back, I should have left much earlier.',
    },
    {
      companySlug: 'infosys',
      primary_category: 'salary',
      sub_category: 'low_appraisal',
      employment_status: 'current',
      team_function: 'Engineering',
      sentiment: 'negative',
      content: 'I have been working at Infosys for about 2 years now as a Senior Systems Engineer. The appraisal cycle here is genuinely disappointing and demotivating. Despite consistently receiving positive feedback from my project manager and client, completing all assigned projects ahead of deadlines, and even taking on additional responsibilities during critical phases, my annual increment was a mere 3 percent. When I questioned this during the appraisal discussion, I was given vague responses about bell curve distribution and budget constraints. The frustrating part is that the market rate for my skill set and experience level is significantly higher - I have been getting offers from other companies that are 40-50 percent more than what I currently make. Many of my colleagues who joined with me have already left for better opportunities. The company seems to be relying on the brand name to retain employees rather than actually compensating them fairly. The worst part is the lack of transparency in the appraisal process - nobody knows what the criteria actually are or how ratings are determined. It feels like a lottery system. I am actively looking for opportunities outside now because staying here means leaving a lot of money on the table.',
    },
    {
      companySlug: 'google-india',
      primary_category: 'culture',
      sub_category: 'no_recognition',
      employment_status: 'current',
      team_function: 'Engineering',
      sentiment: 'positive',
      content: 'I have been with Google India for over a year now working as a Software Engineer in the Cloud Platform team, and I must say the work culture here is genuinely impressive. The peer recognition program is one of the best I have seen in my career. Colleagues regularly appreciate each others work through the internal kudos system, and these recognitions are visible to the entire team. Managers here are trained to actively look for opportunities to appreciate good work publicly. In our team meetings, which happen twice a week, there is always a dedicated segment where the manager highlights individual contributions and team achievements. Beyond just verbal appreciation, there is also a quarterly awards system where outstanding performers are recognized with both monetary rewards and public acknowledgment at the all-hands meeting. What I really appreciate is that the recognition is not limited to just technical achievements - good collaboration, helping team members, improving processes, everything is valued and celebrated. The work environment is incredibly collaborative and supportive. People genuinely want to help each other succeed rather than competing. There is also a strong learning culture with access to courses, conferences, and certifications fully sponsored by the company. Overall, it is a workplace where hard work is noticed and valued.',
    },
    {
      companySlug: 'wipro',
      primary_category: 'manager',
      sub_category: 'micromanagement',
      employment_status: 'past',
      team_function: 'Support',
      sentiment: 'negative',
      content: 'I worked in the infrastructure support team at Wipro for about 18 months before I decided to quit, and the primary reason was the extreme micromanagement from my direct manager. Despite having over 5 years of experience in IT support and system administration, I was constantly treated like a fresh graduate who needed hand-holding for every single task. My manager insisted on hourly email updates detailing exactly what I was working on, which was not only disruptive to actual work but also felt degrading. Every small decision, even routine tasks that I had handled hundreds of times before, required explicit approval. For example, I could not even schedule a server maintenance window without getting written approval via email. This created unnecessary delays and made me completely dependent on the manager for even basic operational decisions. The manager would also randomly call throughout the day to check what I was doing, often while I was in the middle of troubleshooting critical issues. This constant interruption severely affected my productivity and concentration. The trust deficit was palpable - it felt like the manager assumed everyone was incompetent unless proven otherwise. Several experienced team members left because of similar issues. The irony was that this micromanagement was justified as quality control, but it actually led to more errors because people were nervous and second-guessing themselves constantly.',
    },
    {
      companySlug: 'amazon-india',
      primary_category: 'wlb',
      sub_category: 'long_hours',
      employment_status: 'current',
      team_function: 'Operations',
      sentiment: 'neutral',
      content: 'I have been working in Amazon India operations team for the past year and a half, and I can say that the experience has been a mixed bag. The company definitely expects you to put in long hours, and this is not just during festival season sales but pretty much year-round. A typical day for me starts at 9 AM and often extends till 8 or 9 PM. During peak periods like Prime Day or Great Indian Festival, we are expected to work 12-14 hour days including weekends. However, I must acknowledge that Amazon does compensate reasonably well for this - the base salary is competitive and there are stock options that vest over four years. There are also good opportunities for career growth if you can prove yourself and handle the workload. The performance culture is very intense - metrics are tracked religiously and you are expected to meet your targets consistently. The environment can be quite stressful and there is definitely a sink or swim mentality. Many people burn out within the first year itself. On the positive side, you learn a lot and quickly because of the sheer volume and complexity of work. If you are someone who thrives in high-pressure situations and prioritizes career growth over work-life balance, Amazon can be a good fit. But if you value personal time and a relaxed work environment, this is probably not the place for you. I personally am trying to stick it out for another year to vest more stocks and gain the experience.',
    },
    {
      companySlug: 'flipkart',
      primary_category: 'culture',
      sub_category: 'office_politics',
      employment_status: 'past',
      team_function: 'Product',
      sentiment: 'negative',
      content: 'I spent two years at Flipkart in the product management team, and while the company has a strong brand, the internal culture was quite toxic due to excessive office politics. Decisions that should have been based on data and merit were often influenced by who you knew in the leadership chain. Some managers had clear favorites - people who they went to lunch with or who were from the same college or previous company. These favorites got preferential treatment in terms of project allocation, visibility, and promotions, regardless of actual performance. If you were not part of these inner circles, your work was often overlooked or undervalued. I have seen situations where ideas proposed by certain team members were ignored, only to be praised when the same ideas were later repeated by someone in the favored group. This created a very demotivating environment where people spent more time managing relationships and pleasing managers than actually doing good work. There was also a lot of backbiting and credit stealing. I once worked on a complex feature for three months, but during the review meeting, my manager took most of the credit and barely mentioned my contribution. When I tried to speak up, I was told not to be so concerned about recognition. Many good people left because of this culture, and those who stayed learned to play the game. It was exhausting and ultimately I realized that no amount of hard work would be rewarded if you were not in the right camp.',
    },
    {
      companySlug: 'microsoft-india',
      primary_category: 'salary',
      sub_category: 'below_market',
      employment_status: 'current',
      team_function: 'Engineering',
      sentiment: 'positive',
      content: 'I have been working at Microsoft India Development Center in Hyderabad for the past three years as a Senior Software Engineer, and I can confidently say that the compensation package here is among the best in the Indian tech industry. The base salary is very competitive and matches or exceeds market standards for similar roles. But what really makes the total compensation attractive is the comprehensive benefits package. We get excellent health insurance coverage not just for ourselves but also for our family members including parents, which is rare. There are stock options that vest annually, and given Microsoft stocks performance, this adds significant value. The company also provides generous learning and development budgets - I have been able to attend international conferences and get certifications fully sponsored. Annual increments are merit-based and transparent, typically ranging from 8 to 15 percent depending on performance ratings. Bonuses are also substantial if you meet your goals. Beyond monetary compensation, there are perks like flexible work arrangements, well-equipped office spaces, and a strong focus on employee wellness. When I compare notes with friends working at other companies, I realize that Microsoft is definitely on the higher end of the pay scale for software engineers in India. The company genuinely seems to believe in compensating people well to retain talent, and it shows in the low attrition rate in my team.',
    },
    {
      companySlug: 'swiggy',
      primary_category: 'hr',
      sub_category: 'toxic_policies',
      employment_status: 'past',
      team_function: 'Marketing',
      sentiment: 'negative',
      content: 'I worked at Swiggy in the growth marketing team for about a year, and one of the major pain points was dealing with rigid and employee-unfriendly HR policies. The leave approval process was unnecessarily bureaucratic and complicated. You had to apply for leave at least two weeks in advance, get approval from your immediate manager, then the department head, and finally from HR. This made it extremely difficult to take emergency leaves or handle unexpected situations. I once had a family emergency where I needed to travel immediately, but I had to spend hours getting approvals and justifying the urgency. Even then, it was marked as loss of pay despite having unused leave balance. The HR team was not supportive when I raised concerns about the excessive workload and unrealistic deadlines. Instead of addressing the issue or at least acknowledging it, I was told that this is the startup culture and I should learn to adapt. When I mentioned that the constant stress was affecting my health, the response was to suggest I use the employee assistance program, which felt like passing the buck. There was also a policy where you could not take more than two consecutive days off without a doctors certificate, which felt invasive and controlling. The overall feeling was that HR existed to enforce company rules rather than to support employee well-being. Several colleagues shared similar frustrations, and many left citing these rigid policies as a key reason.',
    },
    {
      companySlug: 'zomato',
      primary_category: 'layoffs',
      sub_category: 'sudden_layoffs',
      employment_status: 'past',
      team_function: 'Sales',
      sentiment: 'negative',
      content: 'I was part of the enterprise sales team at Zomato for almost two years when the company suddenly decided to lay off approximately 30 percent of the sales workforce. The entire process was handled very poorly and unprofessionally. There was absolutely no prior communication or warning signs that layoffs were coming. On a regular Tuesday morning, about 40 of us received calendar invites for a group video call scheduled for 11 AM. During that call, which lasted barely 15 minutes, the sales head informed us that our positions were being eliminated effective immediately due to restructuring. We were told to return our laptops and access cards by end of day. The severance package was minimal - just one month of salary regardless of how long you had been with the company. Some people who had been there for three years got the same package as those who had joined six months ago. There was no consideration for notice period or time to find another job. The worst part was the lack of empathy in how it was communicated. It felt like we were just numbers being cut from a spreadsheet. Many of us had families to support and financial commitments like home loans. The sudden loss of income with barely any severance was devastating. Several colleagues tried to negotiate better terms but were flatly refused. The whole experience left a very bitter taste and made me realize how expendable employees are seen in some startups despite all the talk about being a family.',
    },
    {
      companySlug: 'paytm',
      primary_category: 'culture',
      sub_category: 'blame_culture',
      employment_status: 'current',
      team_function: 'Engineering',
      sentiment: 'negative',
      content: 'I have been working in the backend engineering team at Paytm for over a year now, and one of the most toxic aspects of the culture here is the pervasive blame mentality. Whenever something goes wrong - a bug in production, a missed deadline, a failed deployment - the immediate reaction from management is to find someone to blame rather than understanding the root cause and finding solutions. In one incident, a production issue occurred during a deployment that I was part of, and even though it was clearly a problem with the deployment process and inadequate testing, I was singled out and reprimanded in front of the entire team. There was no discussion about why the testing process failed or why the deployment procedure needed improvement. This blame culture has created a fear-driven environment where people are scared to take any risks, experiment with new ideas, or even speak up about potential problems. Everyone is just trying to cover themselves and document everything so they cannot be blamed later. Team members maintain extensive email trails and chat logs just to have proof that they flagged issues or followed proper procedures. Collaboration has suffered significantly because people are reluctant to help others for fear that they might get associated with any failures. Innovation has completely stalled because nobody wants to try anything new that might fail. The irony is that this blame culture actually leads to more problems because people spend more time on defensive documentation than on actually preventing issues.',
    },
    {
      companySlug: 'razorpay',
      primary_category: 'wlb',
      sub_category: 'burnout',
      employment_status: 'current',
      team_function: 'Engineering',
      sentiment: 'neutral',
      content: 'I have been with Razorpay for about eight months now working in the payments infrastructure team. The experience has been intense to say the least. Razorpay definitely has a typical high-growth startup culture where the pace is relentless and expectations are very high. Sprint deadlines are aggressive, and there is always pressure to ship features quickly. We typically work 10-11 hour days regularly, and weekend work is not uncommon especially when dealing with production issues or major releases. The intensity can be exhausting and I have definitely felt close to burnout a few times. However, I must acknowledge that there are some positive aspects that balance this out to some extent. The team culture is genuinely supportive - people are willing to help each other and there is good knowledge sharing. When you are stuck on a problem, senior engineers make time to pair program and help you through it. The work itself is technically challenging and meaningful - we are building financial infrastructure that millions of businesses depend on, which gives a sense of purpose. The engineering standards are high and you learn a lot quickly. Another major plus is the flexibility in terms of work from home. Post pandemic, the company has adopted a hybrid model where you can work from home most days, which helps manage the work-life balance to some extent. The compensation is also competitive with good stock options. Overall, if you are early in your career and willing to trade off personal time for rapid learning and career growth, Razorpay can be a good place. But if you are looking for a more relaxed work environment or have family commitments, this might not be sustainable long term.',
    },
    {
      companySlug: 'phonepe',
      primary_category: 'manager',
      sub_category: 'poor_communication',
      employment_status: 'current',
      team_function: 'Product',
      sentiment: 'negative',
      content: 'I have been working as a Product Manager at PhonePe for close to six months, and one major challenge I face consistently is the poor communication from management. Goal posts and expectations keep shifting without any proper communication or context. I have been in situations where I spent weeks working on a particular feature based on initial requirements, only to find out in a review meeting that the priorities had changed completely and what I was working on was no longer important. Nobody bothered to inform me about this change in direction. I found out about major project pivots and strategy changes through informal discussions with colleagues rather than from my own reporting manager or in official team meetings. There seems to be a disconnect between leadership decisions and how they are communicated down to individual contributors. My one-on-one meetings with my manager, which are supposed to be weekly but often get canceled or postponed, are very rushed when they do happen. They usually last about 15-20 minutes where the manager is clearly distracted and checking their phone or laptop. Feedback during these meetings is extremely vague - I am told things like you need to be more proactive or you should drive more impact, but there is never any specific actionable guidance on what exactly I should do differently. When I try to ask clarifying questions, I get generic responses that do not really help. This lack of clear communication makes it very difficult to know where I stand or what is expected of me. It also creates a lot of wasted effort and rework which is frustrating for everyone involved.',
    },
  ];

  let created = 0;

  for (const postData of samplePosts) {
    // Find company
    const company = await prisma.company.findUnique({
      where: { slug: postData.companySlug },
    });

    if (!company) {
      console.log(`⚠️  Company not found: ${postData.companySlug}`);
      continue;
    }

    // Create post
    await prisma.post.create({
      data: {
        company_id: company.id,
        user_id: adminUser.id,
        primary_category: postData.primary_category,
        sub_category: postData.sub_category,
        employment_status: postData.employment_status,
        team_function: postData.team_function,
        sentiment: postData.sentiment,
        content: postData.content,
        is_published: true, // Publish immediately for demo
        visibility_score: 0.5,
      },
    });

    created++;
    console.log(`✅ Created post for ${company.name}`);
  }

  console.log(`\n🎉 Seeding completed!`);
  console.log(`📝 ${created} sample posts created`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding posts:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

