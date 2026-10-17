export const ALBUMS = [
["debut","Taylor Swift (Debut)","Tim McGraw|Picture to Burn|Teardrops on My Guitar|A Place in This World|Cold as You|The Outside|Tied Together with a Smile|Stay Beautiful|Should've Said No|Mary's Song (Oh My My My)|Our Song"],
["fearless","Fearless","Fearless|Fifteen|Love Story|Hey Stephen|White Horse|You Belong with Me|Breathe|Tell Me Why|You're Not Sorry|The Way I Loved You|Forever & Always|The Best Day|Change"],
["speakNow","Speak Now","Mine|Sparks Fly|Back to December|Speak Now|Dear John|Mean|The Story of Us|Never Grow Up|Enchanted|Better Than Revenge|Innocent|Haunted|Last Kiss|Long Live"],
["red","Red","State of Grace|Red|Treacherous|I Knew You Were Trouble.|All Too Well|22|I Almost Do|We Are Never Ever Getting Back Together|Stay Stay Stay|The Last Time|Holy Ground|Sad Beautiful Tragic|The Lucky One|Everything Has Changed|Starlight|Begin Again"]
].map(([id,name,songs])=>({id,name,songs:songs.split("|")}));
